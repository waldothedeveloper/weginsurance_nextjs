import { useEffect, useState } from "react";

import { getFirebaseUserByPhone } from "@/lib/user_directory/getFirebaseUserByPhone";
import { inboundMessageNotification } from "@/components/notifications/inboundMessageNotification";
import { incomingSMSUserToIdentifyAtom } from "@/lib/state/atoms";
import { useAtom } from "jotai";
import { useSubscribeToMessages } from "@/hooks/messaging/useSubscribeToMessages";

//
export const useIdentifyIncomingUserbyPhone = () => {
  const [identifiedUser, setIdentifiedUser] = useAtom(
    incomingSMSUserToIdentifyAtom
  );
  const [errorIdentifyingUser, setErrorIdentifyingUser] = useState(null);
  const { data, error } = useSubscribeToMessages();

  useEffect(() => {
    const getFirebaseUserDetails = async () => {
      try {
        const firebaseUser = await getFirebaseUserByPhone(data.from);
        setIdentifiedUser({ user: firebaseUser, message: data.body });

        return firebaseUser;
        // TODO: if we have a firebase user, lets give this user to the novu notification system for now, there might be others things to do with this user such as providing them to the unread notifications sort algo.
      } catch (error) {
        setErrorIdentifyingUser({
          error: `No hemos podido identificar al usuario`,
          errorDetails: error,
          message: data.body,
        });

        return {
          error: `No hemos podido identificar al usuario`,
          errorDetails: error,
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
        `${identifiedUser?.user?.fullname}: ${identifiedUser?.message}`
      );
    } else if (errorIdentifyingUser) {
      return inboundMessageNotification(
        `Mensaje nuevo de usuario no identificado: ${errorIdentifyingUser?.message}`
      );
    }

    return () => null;
  }, [identifiedUser, errorIdentifyingUser]);

  return {
    identifiedUser,
    inboundSMSMessageError: error,
    errorIdentifyingUser,
  };
};
