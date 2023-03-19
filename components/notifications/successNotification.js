import { fetcherPost } from "@/utils/fetcherPost";
import { novuSubscriberId } from "@/utils/novuSubscriberId";

export const successNotification = (name) => {
  fetcherPost(
    `/api/notifications/notification`,
    `La compañia ${name} ha sido creada exitosamente.`,
    novuSubscriberId,
    `success-notification`
  ).catch((fetcherPostError) => {
    throw new Error(JSON.stringify(fetcherPostError, null, 2));
  });
};
