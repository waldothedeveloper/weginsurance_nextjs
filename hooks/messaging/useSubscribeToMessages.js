import { pusher } from "@/lib/pusher/config";
import useSWRSubscription from "swr/subscription";

//
export const useSubscribeToMessages = () => {
  const { data, error } = useSWRSubscription("sms", (key, { next }) => {
    const channel = pusher.subscribe(key);
    channel.bind("inbound-sms", (data) => {
      next(null, data);
    });

    channel.bind("pusher:subscription_error", (error) => {
      next(error);
    });

    return () => {
      channel.unbind();
      channel.unsubscribe();
    };
  });

  return { data, error };
};
