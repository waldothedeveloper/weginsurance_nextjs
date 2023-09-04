import { fetcherPostPhoneNumber } from "@/utils/fetcherPostPhoneNumber";
import { selectedUserAtom } from "@/lib/state/atoms";
import { useAtomValue } from "jotai";
import useSWR from "swr";
import { useState } from "react";
//
export const useGetMessagesFromTwilio = () => {
  const [key, setKey] = useState<[string, string | null] | null>(null);
  const selectedUser = useAtomValue(selectedUserAtom);
  const {
    data: messagesFromTwilioAPI,
    error: errorFromTwilioAPI,
    isLoading: isLoadingMessagesFromTwilioAPI,
  } = useSWR(key, (url) =>
    fetcherPostPhoneNumber(url[0], selectedUser?.phone || null)
  );

  return {
    setKey,
    messagesFromTwilioAPI,
    errorFromTwilioAPI,
    isLoadingMessagesFromTwilioAPI,
  };
};
