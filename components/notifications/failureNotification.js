import { fetcherPost } from "@/utils/fetcherPost";
import { novuSubscriberId } from "@/utils/novuSubscriberId";

//
export const failureNotification = (name) => {
  fetcherPost(
    `/api/notifications/notification`,
    `Ha ocurrido un error al crear la compañia ${name}. Intentelo nuevamente. Si el error persiste, contacte al soporte.`,
    novuSubscriberId,
    `error-notification`
  ).catch((fetcherPostError) => {
    throw new Error(JSON.stringify(fetcherPostError, null, 2));
  });
};
