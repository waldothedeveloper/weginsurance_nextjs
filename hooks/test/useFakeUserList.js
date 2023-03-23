import { useEffect, useState } from "react";

import { createRandomUser } from "@/utils/fakerUser";

//
export const useFakeUserList = () => {
  const [fakeUserList, setFakeUserList] = useState([]);

  useEffect(() => {
    function generateUsers() {
      const users = [];
      for (let id = 1; id <= 1000; id++) {
        users.push(createRandomUser());
      }

      return users;
    }

    setFakeUserList(generateUsers());
  }, []);

  return fakeUserList;
};
