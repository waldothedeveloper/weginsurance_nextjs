import {
  Firestore,
  FirestoreDataConverter,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { UserSchema } from "types/global";
import { db } from "@/lib/firebaseConfig";

const userConverter: FirestoreDataConverter<UserSchema> = {
  toFirestore(user) {
    return { ...user };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options)!;
    return { fireUID: snapshot.id, ...data } as UserSchema;
  },
};

export async function getUsers(db: Firestore) {
  const q = query(collection(db, "Users"), orderBy("firstname"));

  const results = await getDocs(q);
  return results.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
}

export function getUsersSnapshot(cb: (results: UserSchema[]) => void) {
  const usersCol = collection(db, "Users").withConverter(userConverter);
  const q = query(
    usersCol,
    orderBy("user.personal_info.firstname"),
    // TODO: We might need later on to put pagination or something else like tanstack virtual and adjust this accordingly
    limit(200)
  );

  const unsubscribe = onSnapshot(q, (snap) => {
    const results = snap.docs.map((d) => d.data());
    cb(results);
  });

  return unsubscribe;
}

export const doesFirebaseUserExist = async (
  phone: string | null | undefined,
  dbParam: Firestore
): Promise<boolean> => {
  if (!phone) throw new Error("Please provide a phone number first");
  if (!dbParam) throw new Error("Please provide a Firestore instance");

  try {
    const querySnapshot = await getDocs(
      query(
        collection(dbParam, "Users"),
        where("user.personal_info.phone", "==", phone)
      )
    );

    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking existing user:", error);
    throw error;
  }
};

export const getSingleFirebaseUser = async (
  userId: string | null | undefined,
  dbParam?: Firestore
): Promise<UserSchema | null> => {
  if (!userId) throw new Error("Please provide a user ID");
  // if (!dbParam) throw new Error("Please provide a Firestore instance");

  try {
    const docRef = doc(dbParam ?? db, "Users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { fireUID: docSnap.id, ...docSnap.data() } as UserSchema;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// create firebase user
export async function createFirebaseUser(data: UserSchema, fireDB: Firestore) {
  if (!data) throw new Error("Please provide a user object first");
  if (!data.user.personal_info.phone)
    throw new Error("Please provide a phone number first");
  try {
    const existingUser = await doesFirebaseUserExist(
      data.user.personal_info.phone,
      fireDB
    );
    if (existingUser) {
      throw new Error(
        `El usuario que usted trata de guardar con ese numero telefonico ya existe`
      );
    }
  } catch (error) {
    console.error("Error checking existing user:", error);
    throw error;
  }
  try {
    const docRef = await addDoc(collection(fireDB, "Users"), data);
    return docRef.id;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
