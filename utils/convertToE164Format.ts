export const convertToE164Format = (phoneNumber: string): string | false => {
  const digitsOnly = phoneNumber.replace(/\D/g, "");
  if (digitsOnly.length === 10) return `+1${digitsOnly}`;
  return false;
};
