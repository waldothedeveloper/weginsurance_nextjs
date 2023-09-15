import { useState } from "react";

export const useCompanyHelpInformation = () => {
  const [openCompanyHelpModal, setOpenCompanyHelpModal] = useState(false);

  return { openCompanyHelpModal, setOpenCompanyHelpModal };
};
