import { messagesListAtom, userPhoneAtom } from "@/lib/state/atoms";
import { useAtomValue, useSetAtom } from "jotai";

import { fetcherPostPhoneNumber } from "@/utils/fetcherPostPhoneNumber";
import { incomingSMSUserToIdentifyAtom } from "@/lib/state/atoms";
import { useEffect } from "react";
import useSWRMutation from "swr/mutation";

export const useRetrieveMessages = () => {
  const userPhone = useAtomValue(userPhoneAtom);
  const identifiedUser = useAtomValue(incomingSMSUserToIdentifyAtom);
  const setMessagesListAtom = useSetAtom(messagesListAtom);

  const { data, error, isMutating, trigger, reset } = useSWRMutation(
    "/api/messaging/sms/retrieve_sms",
    fetcherPostPhoneNumber,
    { revalidate: true }
  );

  useEffect(() => {
    const getSMS = async () => {
      try {
        await trigger(userPhone);
      } catch (error) {
        console.log(error);
        return error;
      }
    };

    if (userPhone) {
      getSMS();
    }

    return () => reset();
  }, [userPhone, trigger, reset]);

  useEffect(() => {
    if (data) {
      try {
        setMessagesListAtom(data);
      } catch (error) {
        // TODO: Please handle this error
        return error;
      }
    }
  }, [data, setMessagesListAtom]);

  useEffect(() => {
    // if there is an incoming sms, and the conversation is active with the same user selected, update the conversation messages list
    const getSMS = async () => {
      try {
        await trigger(userPhone, {
          rollbackOnError: true,
        });
      } catch (error) {
        console.log(error);
        return error;
      }
    };
    if (identifiedUser && identifiedUser?.user?.phone === userPhone) {
      getSMS();
    }
  }, [identifiedUser, userPhone, trigger]);

  return { error, isMutating, trigger };
};
