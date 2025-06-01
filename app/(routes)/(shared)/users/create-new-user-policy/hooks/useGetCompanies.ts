type Companies = { logo_url: string; name: string; notes: string };

import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "@/lib/firebaseConfig";

export const useGetCompanies = () => {
  const [companies, setCompanies] = useState<Companies[]>([]);
  useEffect(() => {
    const q = query(collection(db, "Insurance_Company"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [{ name: "Seleccione una compañia" }] as Companies[];
      querySnapshot.forEach((doc) => {
        cities.push(doc.data() as Companies);
      });
      setCompanies(cities);
    });

    return () => unsubscribe();
  }, []);
  return { companies };
};
