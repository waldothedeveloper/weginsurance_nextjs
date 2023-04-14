import { fetcherPost } from "@/utils/fetcherPost";
import { novuSubscriberId } from "@/utils/novuSubscriberId";

export const inboundMessageNotification = async (message) => {
  if (!message || typeof message !== "string")
    throw new Error(
      "Please provide a message to the success notification system"
    );
  await fetcherPost(
    "/api/notifications/notification",
    message,
    novuSubscriberId,
    "inbound-sms"
  ).catch((fetcherPostError) => {
    throw new Error(JSON.stringify(fetcherPostError, null, 2));
  });
};
