import { AppShell } from "@/components/AppShell/AppShell";
// import Logout from "@/components/logout";
import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

//
export default function UserAccount() {
  const { user } = useUser();
  return (
    <div>
      <AppShell />
      {/* <Logout /> */}
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
