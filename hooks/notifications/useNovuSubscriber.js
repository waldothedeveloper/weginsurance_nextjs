import { novuSubscriberId } from "@/utils/novuSubscriberId";
import { subscriberPost } from "@/utils/subscriberPost";
import useSWRImmutable from "swr";

export const useCreateNovuSubscriber = () => {
  const { data: novuSubscriber, error: novuSubscriberError } = useSWRImmutable(
    novuSubscriberId ? "/api/notifications/create_subscriber" : null,
    (url) => subscriberPost(url, novuSubscriberId)
  );

  return { novuSubscriber, novuSubscriberError };
};
