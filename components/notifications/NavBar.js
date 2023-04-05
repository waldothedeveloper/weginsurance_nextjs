import { NovuNotificationsCenter } from "@/components/notifications/NovuConfig";

export const NavBar = () => {
  return (
    <div className="sticky z-10 hidden bg-white lg:block">
      <div>
        <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-end">
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <NovuNotificationsCenter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
