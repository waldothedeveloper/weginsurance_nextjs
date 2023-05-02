import { useAtomValue, useSetAtom } from "jotai";

import { fetcherPostPhoneNumber } from "@/utils/fetcherPostPhoneNumber";
import { incomingSMSUserToIdentifyAtom } from "@/lib/state/atoms";
import { messagesListAtom } from "@/lib/state/atoms";
import { newInboundSMSHandler } from "@/utils/newInboundSMSHandler";
import { useEffect } from "react";
import useSWRMutation from "swr/mutation";
import { userPhoneAtom } from "@/lib/state/atoms";

export const useRetrieveMessages = () => {
  const userPhone = useAtomValue(userPhoneAtom);
  const identifiedUser = useAtomValue(incomingSMSUserToIdentifyAtom);
  const setIdentifiedUser = useSetAtom(incomingSMSUserToIdentifyAtom);
  const setMessagesList = useSetAtom(messagesListAtom);

  const { data, error, isMutating, trigger } = useSWRMutation(
    "/api/messaging/sms/retrieve_sms",
    fetcherPostPhoneNumber
  );

  useEffect(() => {
    //
    const getSMSList = async () => {
      try {
        const pulledData = await trigger(userPhone, {
          rollbackOnError: true,
        });
        setMessagesList(pulledData);
      } catch (error) {
        // console.log(error);
        return error;
      }
    };

    // if (userPhone) {
    //   getSMSList();
    // }
  }, [userPhone, trigger, setMessagesList]);

  useEffect(() => {
    const updateSMSList = async () => {
      try {
        return await trigger(userPhone, {
          rollbackOnError: true,
          populateCache: true,
          revalidate: false,
          optimisticData: () => {
            const res = newInboundSMSHandler(data, identifiedUser);
            setMessagesList(res);
            return res;
          },

          onSuccess: () => setIdentifiedUser(null),
          onError: (error) => error,
        });
      } catch (error) {
        // console.log(error);
        return error;
      }
    };

    if (identifiedUser && identifiedUser?.user?.phone === userPhone) {
      // console.log(`ABOUT TO UPDATE THE LOCAL DATA FOR INBOUND SMS`);
      updateSMSList();
    }
  }, [
    identifiedUser,
    trigger,
    userPhone,
    setIdentifiedUser,
    data,
    setMessagesList,
  ]);

  return { error, isMutating, trigger, data };
};
