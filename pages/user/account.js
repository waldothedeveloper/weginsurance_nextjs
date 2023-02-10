import Logout from "@/components/logout";
import { useUser } from "@auth0/nextjs-auth0/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function UserAccount() {
  const { user } = useUser();
  return (
    <div>
      <div>Hola, {user?.name}</div>
      <Logout />
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
