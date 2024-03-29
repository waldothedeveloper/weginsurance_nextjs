import { RealUser } from "@/interfaces/index";
import { convertToE164Format } from "@/utils/convertToE164Format";
import { normalizeString } from "@/utils/normalizeString";
//
export const normalizeFirebaseUser = (user: RealUser) => {
  const normalizedUser = user;

  if (normalizedUser?.activeUser === "Si") {
    normalizedUser.activeUser = true;
  } else {
    normalizedUser.activeUser = false;
  }

  const goodPhoneNum = convertToE164Format(normalizedUser?.phone);

  if (goodPhoneNum) {
    normalizedUser.notes = user?.notes.trim();
    normalizedUser.firstname = normalizeString(user?.firstname);
    normalizedUser.secondName = normalizeString(user?.secondName);
    normalizedUser.lastname = normalizeString(user?.lastname);
    normalizedUser.secondLastname = normalizeString(user?.secondLastname);
    normalizedUser.email = user?.email.trim();
    normalizedUser.fullname = `${normalizedUser?.firstname} ${normalizedUser?.lastname}`;
    normalizedUser.phone = goodPhoneNum;
    normalizedUser.firstTimeVisit = user?.firstTimeVisit || false;
    return normalizedUser;
  } else {
    throw new Error("Invalid phone number");
  }
};
