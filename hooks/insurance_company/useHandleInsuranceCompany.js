import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "@/lib/firebaseConfig";

//
export const useInsuranceCompany = () => {
  const [insuranceCompanies, setInsuranceCompanies] = useState(null);
  const [insuranceCompanyError, setInsuranceCompanyError] = useState(null);

  useEffect(() => {
    let unsubscribe = null;
    try {
      const dbQuery = query(
        collection(db, "Insurance_Company"),
        orderBy("name")
      );
      unsubscribe = onSnapshot(dbQuery, (querySnapshot) => {
        const companies = [];
        querySnapshot.forEach((doc) => {
          const tempCompany = doc.data();
          tempCompany.id = doc?.id;
          companies.push(tempCompany);
        });

        setInsuranceCompanies(companies);
      });
    } catch (error) {
      setInsuranceCompanyError(JSON.stringify(error, null, 2));
    }

    return () => {
      if (unsubscribe) unsubscribe();
      setInsuranceCompanies(null);
    };
  }, []);

  return {
    insuranceCompanies,
    insuranceCompanyError,
  };
};
