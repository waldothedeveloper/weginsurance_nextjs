import { useEffect, useState } from "react";

import { getFirebaseUserByPhone } from "@/lib/user_directory/getFirebaseUserByPhone";
import { incomingSMSUserToIdentifyAtom } from "@/lib/state/atoms";
import { useHandleInboundSMS } from "@/hooks/messaging/useHandleInboundSMS";
import { useSetAtom } from "jotai";

//
export const useIdentifyIncomingUserFromInboundSMS = () => {
  const setIdentifiedUser = useSetAtom(incomingSMSUserToIdentifyAtom);

  const [errorIdentifyingUser, setErrorIdentifyingUser] = useState(null);
  const { data, error } = useHandleInboundSMS();

  //
  useEffect(() => {
    const getFireUser = async () => {
      try {
        const fireUser = await getFirebaseUserByPhone(data.From);
        setIdentifiedUser({ user: fireUser, message: data });
      } catch (error) {
        setErrorIdentifyingUser({
          error: "No hemos podido identificar al usuario",
          errorDetails: error,
          message: data.Body,
        });
      }
    };
    if (data) {
      getFireUser();
    }
  }, [data, setIdentifiedUser]);

  return {
    inboundSMSMessageError: error,
    errorIdentifyingUser,
  };
};
