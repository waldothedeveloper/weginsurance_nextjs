import { buildClerkProps, clerkClient, getAuth } from "@clerk/nextjs/server";

import { AppShell } from "@/components/AppShell/AppShell";

//
export default function UserAccount() {
  return (
    <div>
      <AppShell />
    </div>
  );
}

export const getServerSideProps = async ({ req }) => {
  const { userId } = getAuth(req);

  const user = userId ? await clerkClient.users.getUser(userId) : undefined;
  // ...
  return { props: { ...buildClerkProps(req, { user }) } };
};
