import { useEffect, useState } from "react";

import { inboundMessageNotification } from "@/components/notifications/inboundMessageNotification";
import { incomingSMSUserToIdentifyAtom } from "@/lib/state/atoms";
import { useAtomValue } from "jotai";

export const useHandleNotifications = (errorIdentifyingUser) => {
  const identifiedUser = useAtomValue(incomingSMSUserToIdentifyAtom);
  const [notiError, setNotiError] = useState(null);

  useEffect(() => {
    // send the notification to novu in-app
    const fireNotification = async (msg) => {
      return await inboundMessageNotification(msg);
    };

    if (identifiedUser) {
      try {
        fireNotification(
          `${identifiedUser?.user?.fullname}: ${identifiedUser?.message?.Body}`
        );
      } catch (error) {
        setNotiError(error);
      }
    }

    if (errorIdentifyingUser) {
      try {
        fireNotification(`Mensaje nuevo: ${errorIdentifyingUser?.message}`);
      } catch (error) {
        setNotiError(error);
      }
    }

    return () => null;
  }, [identifiedUser, errorIdentifyingUser]);

  return { notiError };
};
