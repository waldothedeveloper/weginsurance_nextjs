import {
  NotificationBell,
  NovuProvider,
  PopoverNotificationCenter,
} from "@novu/notification-center";

import { novuSubscriberId } from "@/utils/novuSubscriberId";

const appIdentified =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_DEVELOPMENT_applicationIdentifier
    : process.env.NEXT_PUBLIC_PRODUCTION_applicationIdentifier;

//
export const NovuNotificationsCenter = () => {
  // your logic to handle the notification click
  function onNotificationClick(message) {
    return message;
  }

  return (
    <NovuProvider
      // TODO: check how to change this
      styles={{
        root: {
          bellButton: {
            ":firstChild": {
              width: "12px !important",
              height: "12px !important",
            },
          },
        },
      }}
      stores={[
        { storeId: "mensajes", query: { feedIdentifier: "mensajes" } },
        { storeId: "general", query: { feedIdentifier: "general" } },
      ]}
      subscriberId={novuSubscriberId}
      applicationIdentifier={appIdentified}
      initialFetchingStrategy={{
        fetchNotifications: true,
      }}
      i18n={"es"}
    >
      <PopoverNotificationCenter
        tabs={[
          { name: "Mensajes", storeId: "mensajes" },
          { name: "General", storeId: "general" },
        ]}
        showUserPreferences={false}
        colorScheme={"light"}
        onNotificationClick={onNotificationClick}
      >
        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
    </NovuProvider>
  );
};
