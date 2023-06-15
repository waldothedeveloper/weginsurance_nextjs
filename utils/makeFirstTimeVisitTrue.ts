import { FakeUser, RealUser } from "@/interfaces/index";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "@/lib/firebaseConfig";

export const makeFirstTimeVisitTrue = async (
  selectedUser: RealUser | FakeUser | null
) => {
  if (!selectedUser) return;
  const docRef = doc(db, "Users", selectedUser?.id);

  try {
    await updateDoc(docRef, {
      firstTimeVisit: true,
    });
  } catch (error: any) {
    console.error(
      "Error adding last visited timestamp to a the user's document: ",
      error
    );
  }
};
