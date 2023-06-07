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

import { Novu } from "@novu/node";
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
    const { MessageSid, MessageStatus, To } = req.body;

    if (typeof MessageSid !== "string") {
      return res
        .type("text/plain")
        .status(400)
        .send("Webhook error - No MessageSid found.");
    }

    const collection = adminFirestore().collection(config.messageCollection);
    const userCollection = adminFirestore().collection("Users");
    functions.logger.log(`Attempting status update for message: ${MessageSid}`);

    try {
      const userQuery = await userCollection
        .where("phone", "==", To)
        .limit(1)
        .get();

      if (userQuery.empty) {
        functions.logger.error(
          `Could not find user document for message with SID: ${MessageSid} and To: ${To}`
        );
      }

      const conversationsQuery = await adminFirestore()
        .collection(`Users/${userQuery.docs[0].id}/conversations`)
        .where("delivery.info.messageSid", "==", MessageSid)
        .get();

      if (conversationsQuery.empty) {
        functions.logger.error(
          `Could not find document on the user's conversation subcollection for message with SID: ${MessageSid}`
        );
      } else {
        await adminFirestore().runTransaction((transaction) => {
          // update the conversation subcollection with the message status
          transaction.update(
            conversationsQuery.docs[0].ref,
            "delivery.info.status",
            MessageStatus
          );
          return Promise.resolve();
        });
      }
    } catch (error) {
      functions.logger.error(error);
    }

    try {
      const query = await collection
        .where("delivery.info.messageSid", "==", MessageSid)
        .limit(1)
        .get();

      //
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
    const { to, body, mediaUrl } = payload;
    // attempting to send the sms message
    const message = await twilioClient.messages.create({
      from,
      to,
      body,
      mediaUrl,
      statusCallback: getFunctionsUrl("statusCallback"),
    });

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
    update["delivery.errorCode"] = `${error.code}`;
    update["delivery.errorMessage"] = `${error.message} ${error.moreInfo}`;
    functions.logger.error(
      `Error when delivering message: ${String(ref.path)}: ${String(error)}`
    );
  }

  // this is a ref to the user's conversation sub-collection
  const query = await adminFirestore()
    .collection(`Users/${payload.userId}/conversations`)
    .where("sid", "==", payload?.sid)
    .limit(1)
    .get();

  return adminFirestore().runTransaction((transaction) => {
    transaction.update(ref, update);
    // update the conversation sub-collection with the same data for the user that received the message
    transaction.update(adminFirestore().doc(query.docs[0].ref.path), update);
    return Promise.resolve();
  });
}

async function processCreate(
  snapshot: functions.Change<FirebaseFirestore.DocumentSnapshot>
) {
  const data = snapshot?.after?.data() as QueuePayload;
  const conversationsRef = adminFirestore().collection(
    `Users/${data.userId}/conversations`
  );

  const initialData = Object.assign({}, data, {
    delivery: {
      startTime: fv,
      state: "PENDING",
      errorCode: null,
      errorMessage: null,
      info: null,
    },
  });

  // In a transaction, store a delivery object that logs the time it was
  // updated, the initial state (PENDING), and empty properties for info about
  // the message or error codes and messages.
  return adminFirestore().runTransaction(
    (transaction: adminFirestore.Transaction) => {
      transaction.update(snapshot.after.ref, {
        delivery: {
          startTime: fv,
          state: "PENDING",
          errorCode: null,
          errorMessage: null,
          info: null,
        },
      });
      //  put the message in the user's conversation sub-collection
      transaction.create(conversationsRef.doc(), initialData);

      return Promise.resolve();
    }
  );
}

async function processCases(
  payload: QueuePayload,
  change: functions.Change<FirebaseFirestore.DocumentSnapshot>
) {
  if (!payload.delivery) return;

  // this is a ref to the user's conversation sub-collection
  const query = await adminFirestore()
    .collection(`Users/${payload.userId}/conversations`)
    .where("sid", "==", payload?.sid)
    .limit(1)
    .get();

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
        return adminFirestore().runTransaction(async (transaction) => {
          transaction.update(change.after.ref, {
            "delivery.state": "ERROR",
            errorMessage: "Message processing lease expired.",
          });

          //  update the conversation sub-collection with the same data for the user that received the message
          transaction.update(adminFirestore().doc(query.docs[0].ref.path), {
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
        //  update the conversation sub-collection with the same data for the user that received the message
        transaction.update(adminFirestore().doc(query.docs[0].ref.path), {
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
    return processCreate(change);
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

  if (!payload.userId) {
    functions.logger.error(
      `message=${String(
        change.after.ref.path
      )} is missing 'userId' field. This field is needed for updating the conversation sub-collection in the selected user's collection.`
    );
    return;
  }

  return processCases(payload, change);
}

exports.findMessage = functions.firestore
  .document("messages/{messageId}")
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

exports.incomingMessage = functions.https.onRequest(
  async (req: Request, res: Response): Promise<any> => {
    initialize();
    const {
      twilio: { authToken },
    } = config;
    const signature = req.get("x-twilio-signature");
    const url = getFunctionsUrl("incomingMessage");
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
    const {
      MessageSid,
      From,
      To,
      Body,
      NumSegments,
      SmsStatus,
      NumMedia,
      FromCity,
      FromState,
      FromZip,
    } = req.body;

    if (typeof MessageSid !== "string") {
      return res
        .type("text/plain")
        .status(400)
        .send("Webhook error - No MessageSid found.");
    }

    const incomingMessage = {
      mediaUrl: [],
      from: From,
      direction: "inbound",
      body: Body,
      delivery: {
        state: SmsStatus,
        startTime: {
          seconds: null,
          nanoseconds: 0,
        },
        info: {
          dateSent: null,
          numSegments: NumSegments,
          dateUpdated: {
            seconds: null,
            nanoseconds: 0,
          },
          numMedia: NumMedia,
          status: SmsStatus,
          messagingServiceSid: null,
          messageSid: MessageSid,
          dateCreated: {
            seconds: new Date().getTime() / 1000,
            nanoseconds: 0,
          },
        },
        errorCode: null,
        leaseExpireTime: null,
        endTime: {
          seconds: null,
          nanoseconds: 0,
        },
        errorMessage: null,
      },
      to: To,
      sid: MessageSid,
      userId: "",
      dateCreated: new Date().toISOString(),
    };

    const userCollection = adminFirestore().collection("Users");
    functions.logger.log(
      `Attempting to identify the user who sent the message from phone number: ${From}`
    );

    // notify the application client using NOVU notifications
    const novu = new Novu(process.env.NOVU_API_KEY || "");
    // ! remember that for development testing you need to keep the NOVU_DEVELOPMENT_SUBSCRIBER environment variable set, and NEVER use the production subscriber
    const novuSubscriber = process.env.IS_FIREBASE_CLI
      ? process.env.NOVU_DEVELOPMENT_SUBSCRIBER
      : process.env.NOVU_PRODUCTION_SUBSCRIBER;

    try {
      const user = await userCollection
        .where("phone", "==", From)
        .limit(1)
        .get();

      if (user.empty) {
        functions.logger.warn(
          `Could not find user document for message with SID: ${MessageSid} and From: ${From}`
        );

        try {
          await novu.trigger("inbound-sms", {
            to: {
              subscriberId: novuSubscriber ?? "",
            },
            payload: {
              message: `${From}: ${Body} - ${FromCity}, ${FromState}, ${FromZip}`,
            },
          });
        } catch (error) {
          functions.logger.error(
            "There was an error trying to send the notification of a new message to the client"
          );
          return Promise.reject(error);
        }

        // create a user document for the incoming message
        const newUser = {
          activeUser: true,
          email: null,
          firstname: "Usuario",
          fullname: "Usuario Desconocido",
          gender: "Masculino",
          insuranceCompany: null,
          lastname: "Desconocido",
          notes: "",
          phone: From,
          second_lastname: "",
          second_name: "",
        };

        try {
          const userRef = adminFirestore().collection("Users").doc();
          const conversationRef = userRef.collection("conversations").doc();

          await adminFirestore().runTransaction(async (transaction) => {
            transaction.set(userRef, newUser);
            incomingMessage.userId = userRef.id;
            transaction.set(conversationRef, incomingMessage);
            return Promise.resolve();
          });
        } catch (error) {
          functions.logger.error(
            "There was an error trying to save the unknown user and user message in the database"
          );
          return Promise.reject(error);
        }
      } else {
        functions.logger.log(`Found user: ${user.docs[0].id}`);

        try {
          await novu.trigger("inbound-sms", {
            to: {
              subscriberId: novuSubscriber ?? "",
            },
            payload: {
              message: `${
                user.docs[0].data().fullname
              }:  ${Body} - ${FromCity}, ${FromState}, ${FromZip}`,
            },
          });
        } catch (error) {
          functions.logger.error(
            "There was an error trying to send the notification of a new message to the client"
          );
          return Promise.reject(error);
        }

        incomingMessage.userId = user.docs[0].id;

        try {
          // save the message in the user's conversation sub-collection
          await adminFirestore().runTransaction((transaction) => {
            transaction.set(
              adminFirestore()
                .collection("Users")
                .doc(user.docs[0].id)
                .collection("conversations")
                .doc(incomingMessage.sid),
              incomingMessage
            );
            return Promise.resolve();
          });
        } catch (error) {
          functions.logger.error(
            "There was an error trying to save the message in the user's conversation sub-collection"
          );
          return Promise.reject(error);
        }
      }
      functions.logger.log("End of incomingMessage processing function.");
    } catch (error) {
      functions.logger.error(error);
      return Promise.reject(error);
    }

    res.contentType("text/xml");
    res.send(new twiml.MessagingResponse().toString());
    return;
  }
);
