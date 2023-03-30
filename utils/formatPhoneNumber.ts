export const formatPhoneNumber = (phoneNumberString: string): string | null => {
  const cleaned = String(phoneNumberString).replace(/\D/g, "");
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return ["(", match[2], ") ", match[3], "-", match[4]].join("");
  }
  return null;
};