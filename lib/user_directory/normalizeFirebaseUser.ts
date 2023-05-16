import { RealUser } from "@/interfaces/index";
import { convertToE164Format } from "@/utils/convertToE164Format";
import { normalizeString } from "@/utils/normalizeString";
//
export const normalizeFirebaseUser = (user: RealUser) => {
  const normalizedUser = user;

  if (normalizedUser?.active_user === "Si") {
    normalizedUser.active_user = true;
  } else {
    normalizedUser.active_user = false;
  }

  const goodPhoneNum = convertToE164Format(normalizedUser?.phone);

  if (goodPhoneNum) {
    normalizedUser.notes = user?.notes.trim();
    normalizedUser.firstname = normalizeString(user?.firstname);
    normalizedUser.second_name = normalizeString(user?.second_name);
    normalizedUser.lastname = normalizeString(user?.lastname);
    normalizedUser.second_lastname = normalizeString(user?.second_lastname);
    normalizedUser.email = user?.email.trim();
    normalizedUser.fullname = `${normalizedUser?.firstname} ${normalizedUser?.lastname}`;
    normalizedUser.phone = goodPhoneNum;
    return normalizedUser;
  } else {
    throw new Error("Invalid phone number");
  }
};
