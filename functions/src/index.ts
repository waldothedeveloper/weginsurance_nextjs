/* eslint-disable max-len */
/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable require-jsdoc */
/* eslint-disable object-curly-spacing */
/* eslint-disable quote-props */
import * as functions from "firebase-functions";

import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { Request, Response } from "express";
import { getFunctionsUrl, initialize, twilioClient } from "./utils";
import { twiml, validateRequest } from "twilio";

import { QueuePayload } from "./types";
import { firestore as adminFirestore } from "firebase-admin";
import config from "./config";

const fv: FieldValue = FieldValue.serverTimestamp();

const terminalStatuses = ["delivered", "undelivered", "failed"];

exports.statusCallback = functions.https.onRequest(
  async (req: Request, res: Response): Promise<any> => {
    initialize();
    const {
      twilio: { authToken },
    } = config;
    const signature = req.get("x-twilio-signature");
    const url = getFunctionsUrl("statusCallback");
    const params = req.body;
    if (!signature) {
      return res
        .type("text/plain")
        .status(400)
        .send(
          "No signature header error - X-Twilio-Signature header does not exist, maybe this request is not coming from Twilio."
        );
    }
    if (typeof authToken !== "string") {
      return res
        .type("text/plain")
        .status(500)
        .send(
          "Webhook Error - we attempted to validate this request without first configuring our auth token."
        );
    }
    if (!validateRequest(authToken, signature, url, params)) {
      return res
        .type("text/plain")
        .status(403)
        .send("Twilio Request Validation Failed");
    }
    const { MessageSid, MessageStatus } = req.body;

    if (typeof MessageSid !== "string") {
      return res
        .type("text/plain")
        .status(400)
        .send("Webhook error - No MessageSid found.");
    }

    const firestore = adminFirestore();
    const collection = firestore.collection(config.messageCollection);
    functions.logger.log(`Attempting status update for message: ${MessageSid}`);

    try {
      const query = await collection
        .where("delivery.info.messageSid", "==", MessageSid)
        .limit(1)
        .get();
      if (query.docs.length === 0) {
        functions.logger.error(
          `Could not find document for message with SID: ${MessageSid}`
        );
      } else {
        const doc = query.docs[0];
        functions.logger.log(
          `Found document for message ${MessageSid} with ref ${String(
            doc.ref.path
          )}`
        );
        const currentStatus = doc.get("delivery.info.status");
        if (terminalStatuses.includes(currentStatus)) {
          functions.logger.log(
            `Message ${MessageSid} with ref ${String(
              doc.ref.path
            )} already has terminal status of ${String(
              currentStatus
            )}; skipping update.`
          );
        } else {
          await adminFirestore().runTransaction((transaction) => {
            transaction.update(doc.ref, "delivery.info.status", MessageStatus);
            return Promise.resolve();
          });
        }
      }
    } catch (error) {
      functions.logger.error(error);
    }
    res.contentType("text/xml");
    res.send(new twiml.MessagingResponse().toString());
    return;
  }
);

async function deliverMessage(
  payload: QueuePayload,
  ref: adminFirestore.DocumentReference
): Promise<void> {
  functions.logger.log(`Attempting delivery for message: ${String(ref.path)}`);
  const update = {
    "delivery.endTime": fv,
    "delivery.leaseExpireTime": null,
    "delivery.state": "SUCCESS",
    "delivery.info": {},
    "delivery.errorCode": "",
    "delivery.errorMessage": "",
  };

  try {
    const from =
      payload.from ||
      config.twilio.messagingServiceSid ||
      config.twilio.phoneNumber;
    // don't forget to put mediaUrl back here
    const { to, body, mediaUrl } = payload;
    const message = await twilioClient.messages.create({
      from,
      to,
      body,
      mediaUrl,
      statusCallback: getFunctionsUrl("statusCallback"),
    });
    functions.logger.log(
      "Functions callback?",
      getFunctionsUrl("statusCallback")
    );
    const info = {
      messageSid: message.sid,
      status: message.status,
      dateCreated: message.dateCreated
        ? Timestamp.fromDate(message.dateCreated)
        : null,
      dateSent: message.dateSent ? Timestamp.fromDate(message.dateSent) : null,
      dateUpdated: message.dateUpdated
        ? Timestamp.fromDate(message.dateUpdated)
        : null,
      messagingServiceSid: message.messagingServiceSid,
      numMedia: message.numMedia,
      numSegments: message.numSegments,
    };
    update["delivery.state"] = "SUCCESS";
    update["delivery.info"] = info;
    functions.logger.log(
      `Delivered message: ${String(
        ref.path
      )} successfully. MessageSid: ${String(info.messageSid)}`
    );
  } catch (error: any) {
    update["delivery.state"] = "ERROR";
    update["delivery.errorCode"] = error.code.toString();
    update["delivery.errorMessage"] = `${error.message} ${error.moreInfo}`;
    functions.logger.error(
      `Error when delivering message: ${String(ref.path)}: ${String(error)}`
    );
  }

  return adminFirestore().runTransaction((transaction) => {
    transaction.update(ref, update);
    return Promise.resolve();
  });
}

function processCreate(
  snapshot: adminFirestore.DocumentSnapshot<adminFirestore.DocumentData>
) {
  // In a transaction, store a delivery object that logs the time it was
  // updated, the initial state (PENDING), and empty properties for info about
  // the message or error codes and messages.
  return adminFirestore().runTransaction(
    (transaction: adminFirestore.Transaction) => {
      transaction.update(snapshot.ref, {
        delivery: {
          startTime: fv,
          state: "PENDING",
          errorCode: null,
          errorMessage: null,
          info: null,
        },
      });
      return Promise.resolve();
    }
  );
}

async function processCases(
  payload: QueuePayload,
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>
) {
  if (!payload.delivery) return;
  switch (payload.delivery.state) {
    case "SUCCESS":
    case "ERROR":
      // Processing complete, nothing more to do.
      return;
    case "PROCESSING":
      if (
        payload.delivery.leaseExpireTime &&
        payload.delivery.leaseExpireTime.toMillis() < Date.now()
      ) {
        // It has taken too long to process the message, mark it as an error.
        return adminFirestore().runTransaction((transaction) => {
          transaction.update(change.after.ref, {
            "delivery.state": "ERROR",
            errorMessage: "Message processing lease expired.",
          });
          return Promise.resolve();
        });
      }
      return;
    case "PENDING":
      // Update the message to the processing state and give it 60 seconds to
      // run. Then call the deliver function.
      await adminFirestore().runTransaction((transaction) => {
        transaction.update(change.after.ref, {
          "delivery.state": "PROCESSING",
          "delivery.leaseExpireTime": Timestamp.fromMillis(Date.now() + 60000),
        });
        return Promise.resolve();
      });

      return deliverMessage(payload, change.after.ref);
  }
}

async function processWrite(
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>
): Promise<void> {
  if (!change.after.exists) {
    // Document has been deleted, nothing to do here.
    return;
  }

  if (!change.before.exists && change.after.exists) {
    // Document has been created, initialize the delivery state
    return processCreate(change.after);
  }

  // The document has been updated, so we fetch the data in the document to
  // determine what to do next.
  const payload = change.after.data() as QueuePayload;

  if (!payload.delivery) {
    // Document does not have a delivery object so something has gone wrong.
    // Log and exit.
    functions.logger.error(
      `message=${String(change.after.ref.path)} is missing 'delivery' field`
    );
    return;
  }

  return processCases(payload, change);
}

exports.findMessage = functions.firestore
  .document("messages/{messageID}")
  .onWrite(
    // eslint-disable-next-line max-len
    async (change: functions.Change<FirebaseFirestore.DocumentSnapshot>) => {
      initialize();
      try {
        // Document has been created, initialize the delivery state
        functions.logger.info(
          `message=${String(change.after.ref.path)} created`
        );
        await processWrite(change);
      } catch (error) {
        functions.logger.error(error);
        return;
      }
      functions.logger.log(
        "Completed execution of Twilio send message extension."
      );
    }
  );
