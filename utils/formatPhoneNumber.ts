export const formatPhoneNumberToNationalUSAformat = (
  value: string | null | undefined
) => {
  if (!value || typeof value !== "string") return;
  const digitsOnly = value.replace(/\D/g, ""); // Remove all non-digit characters

  if (digitsOnly.length === 11 && digitsOnly.startsWith("1")) {
    // E.164 format with country code
    return `(${digitsOnly.slice(1, 4)}) ${digitsOnly.slice(
      4,
      7
    )}-${digitsOnly.slice(7, 11)}`;
  } else {
    if (digitsOnly.length <= 3) {
      return digitsOnly;
    }

    if (digitsOnly.length <= 6) {
      return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3)}`;
    }

    return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(
      3,
      6
    )}-${digitsOnly.slice(6, 10)}`;
  }
};
