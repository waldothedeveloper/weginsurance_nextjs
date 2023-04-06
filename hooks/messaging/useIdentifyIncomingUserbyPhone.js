import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

import { getFirebaseUserByPhone } from "@/lib/user_directory/getFirebaseUserByPhone";
import { inboundMessageNotification } from "@/components/notifications/inboundMessageNotification";
import { incomingSMSUserToIdentifyAtom } from "@/lib/state/atoms";
import { useSubscribeToMessages } from "@/hooks/messaging/useSubscribeToMessages";

//
export const useIdentifyIncomingUserbyPhone = () => {
  const setIdentifiedUser = useSetAtom(incomingSMSUserToIdentifyAtom);
  const identifiedUser = useAtomValue(incomingSMSUserToIdentifyAtom);
  const [errorIdentifyingUser, setErrorIdentifyingUser] = useState(null);
  const { data, error } = useSubscribeToMessages();

  //
  useEffect(() => {
    const getFirebaseUserDetails = async () => {
      try {
        const firebaseUser = await getFirebaseUserByPhone(data.From);
        setIdentifiedUser({ user: firebaseUser, message: data });

        return firebaseUser;
        // TODO: if we have a firebase user, lets give this user to the novu notification system for now, there might be others things to do with this user such as providing them to the unread notifications sort algo.
      } catch (firebaseUserError) {
        setErrorIdentifyingUser({
          error: "No hemos podido identificar al usuario",
          errorDetails: firebaseUserError,
          message: data.Body,
        });

        return {
          error: "No hemos podido identificar al usuario",
          errorDetails: firebaseUserError,
        };
      }
    };

    if (data) {
      getFirebaseUserDetails();
    }
  }, [data, setIdentifiedUser]);

  useEffect(() => {
    if (identifiedUser) {
      // send the notification to novu in-app
      return inboundMessageNotification(
        `${identifiedUser?.user?.fullname}: ${identifiedUser?.message?.Body}`
      );
    } else if (errorIdentifyingUser) {
      return inboundMessageNotification(
        `Mensaje nuevo de usuario no identificado: ${errorIdentifyingUser?.message}`
      );
    }

    return () => null;
  }, [identifiedUser, errorIdentifyingUser]);

  return {
    inboundSMSMessageError: error,
    errorIdentifyingUser,
  };
};
