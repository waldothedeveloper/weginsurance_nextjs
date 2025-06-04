import { UserButton } from "@clerk/nextjs";

export const LoggedInUserButton = () => {
  return (
    <UserButton
      showName
      appearance={{
        elements: {
          userButtonBox: {
            flexDirection: "row-reverse",
          },
        },
      }}
    />
  );
};
