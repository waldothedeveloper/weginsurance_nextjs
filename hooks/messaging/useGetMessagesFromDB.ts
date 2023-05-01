import {
  DocumentData,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import { VirtualizedConversationType } from "@/interfaces/index";
import { db } from "@/lib/firebaseConfig";
import { messagesAtom } from "@/lib/state/atoms";
import { useSetAtom } from "jotai";

//
export const useGetMessagesFromDB = () => {
  const setMessagesAtom = useSetAtom(messagesAtom);

  //
  const getMessages = async (userId: string) => {
    if (!userId || userId?.length === 0) throw new Error("userId is required");
    const userMessages = query(
      collection(db, `Users/${userId}/conversations`),
      orderBy("dateCreated", "desc")
    );
    const messages: DocumentData | VirtualizedConversationType = [];
    const querySnapshot = await getDocs(userMessages);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      messages.push(doc.data());
    });

    setMessagesAtom(messages);
  };

  return { getMessages };
};
