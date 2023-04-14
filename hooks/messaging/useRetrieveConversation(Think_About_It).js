import { useAtomValue, useSetAtom } from "jotai";

import { filterMessagesAndSort } from "@/utils/filterMessagesAndSort";
import { formatAtomDates } from "@/utils/formatAtomDates";
import { fromDateAtom } from "@/lib/state/atoms";
import { messagesListAtom } from "@/lib/state/atoms";
import { useEffect } from "react";
import useSWRInfinite from "swr/infinite";

const userPhoneNumber = `+17865213075`;

//
const fetcher = async (msg) => {
  return await fetch("/api/messaging/sms/retrieve_virtualized_sms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fromDate: msg.fromDate,
      userPhoneNum: userPhoneNumber,
    }),
  }).then((res) => res.json());
};

const getKey = (fromDate) => {
  return {
    fromDate: formatAtomDates(fromDate),
  };
};

export const useRetrieveConversation = () => {
  const setMessageListAtom = useSetAtom(messagesListAtom);
  // derived atom from toDate
  const fromDate = useAtomValue(fromDateAtom);
  const { data, size, setSize, isValidating, isLoading, error } =
    useSWRInfinite(() => getKey(fromDate), fetcher);
  console.log("so far: ", data && data[0]?.length + " in total from twilio");

  const messages = useAtomValue(messagesListAtom);

  useEffect(() => {
    if (data) setMessageListAtom(filterMessagesAndSort(data));
  }, [data, setMessageListAtom]);

  return {
    dataFromApp: messages,
    setSizeFromApp: setSize,
    errorFromApp: error,
    sizeFromApp: size,
  };
};
