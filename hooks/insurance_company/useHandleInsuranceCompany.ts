import {
  Unsubscribe,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { InsuranceCompany } from "@/interfaces/index";
import { db } from "@/lib/firebaseConfig";

//
export const useInsuranceCompany = () => {
  const [insuranceCompanies, setInsuranceCompanies] = useState<
    InsuranceCompany[] | null
  >(null);
  const [insuranceCompanyError, setInsuranceCompanyError] = useState<
    string | null
  >(null);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    try {
      const dbQuery = query(
        collection(db, "Insurance_Company"),
        orderBy("name")
      );
      unsubscribe = onSnapshot(dbQuery, (querySnapshot) => {
        const companies: InsuranceCompany[] = [];
        querySnapshot.forEach((doc) => {
          const tempCompany = doc.data() as InsuranceCompany;
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
