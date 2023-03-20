import { fetcherPost } from "@/utils/fetcherPost";
import { novuSubscriberId } from "@/utils/novuSubscriberId";

//
export const failureNotification = (message) => {
  if (!message || typeof message !== "string")
    throw new Error(
      `Please provide a message to the success notification system`
    );
  fetcherPost(
    `/api/notifications/notification`,
    message,
    novuSubscriberId,
    `error-notification`
  ).catch((fetcherPostError) => {
    throw new Error(JSON.stringify(fetcherPostError, null, 2));
  });
};
