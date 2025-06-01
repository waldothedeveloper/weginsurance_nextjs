import {
  DocumentData,
  Firestore,
  FirestoreDataConverter,
  addDoc,
  collection,
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
    return { ...data } as UserSchema;
  },
};

export async function getUsers(db: Firestore) {
  let q = query(collection(db, "Users"), orderBy("firstname"));

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
    limit(200)
  );

  const unsubscribe = onSnapshot(q, (snap) => {
    const results = snap.docs.map((d) => d.data());
    cb(results);
  });

  return unsubscribe;
}

// get firebase user by phone
export async function getFirebaseUserByPhone(
  phone: string | null | undefined,
  dbParam: any
): Promise<DocumentData | null> {
  if (!phone) throw new Error("Please provide a phone number first");

  try {
    const querySnapshot = await getDocs(
      query(collection(dbParam, "Users"), where("phone", "==", phone))
    );

    if (querySnapshot.empty) {
      return null;
    } else {
      const tempUser = querySnapshot.docs[0].data();
      tempUser.id = querySnapshot.docs[0]?.id;
      return tempUser;
    }
  } catch (error) {
    console.error("Error checking existing user:", error);
    throw error;
  }
}

// create firebase user
export async function createFirebaseUser(data: UserSchema, fireDB: Firestore) {
  if (!data) throw new Error("Please provide a user object first");
  if (!data.user.personal_info.phone)
    throw new Error("Please provide a phone number first");
  try {
    const existingUser = await getFirebaseUserByPhone(
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
