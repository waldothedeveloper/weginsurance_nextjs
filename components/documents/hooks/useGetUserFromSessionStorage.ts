import { useEffect, useState } from "react";

import { RealUser } from "@/interfaces/index";
import { useRouter } from "next/router";

export const useGetUserFromSessionStorage = () => {
  const [user, setUser] = useState<RealUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    } else {
      router.push("/404");
    }
  }, [router]);

  return { user };
};
