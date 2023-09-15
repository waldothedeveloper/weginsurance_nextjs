import dayjs from "dayjs";

export const signerSignatureDate = () => {
  return dayjs().format("YYYY-MM-DD");
};
