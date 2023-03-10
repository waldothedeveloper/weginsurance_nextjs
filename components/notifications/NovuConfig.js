import {
  NotificationBell,
  NovuProvider,
  PopoverNotificationCenter,
} from "@novu/notification-center";

import { novuSubscriberId } from "@/utils/novuSubscriberId";

//
export const NovuNotificationsCenter = () => {
  // your logic to handle the notification click
  function onNotificationClick(message) {
    return message;
  }

  return (
    <NovuProvider
      subscriberId={novuSubscriberId}
      applicationIdentifier={
        process.env.NEXT_PUBLIC_DEVELOPMENT_applicationIdentifier
      }
      initialFetchingStrategy={{
        fetchNotifications: true,
      }}
      i18n={"es"}
    >
      <PopoverNotificationCenter
        showUserPreferences={false}
        colorScheme={"light"}
        onNotificationClick={onNotificationClick}
      >
        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
    </NovuProvider>
  );
};
