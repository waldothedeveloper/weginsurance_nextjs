import { UserButton } from "@clerk/nextjs";

export const LoggedInUserButton = () => {
  return (
    <UserButton
      showName
      appearance={{
        elements: {
          userButtonBox: "flex flex-row-reverse",
          userButtonOuterIdentifier: "text-sm font-medium text-slate-900",
        },
      }}
    />
  );
};
