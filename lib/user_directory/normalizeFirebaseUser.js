import { normalizeString } from "@/utils/normalizeString";
//
export const normalizeFirebaseUser = (user) => {
  const normalizedUser = user;

  if (normalizedUser?.active_user === "Si") {
    normalizedUser.active_user = true;
  } else {
    normalizedUser.active_user = false;
  }

  normalizedUser.notes = user?.notes.trim();
  normalizedUser.firstname = normalizeString(user?.firstname);
  normalizedUser.second_name = normalizeString(user?.second_name);
  normalizedUser.lastname = normalizeString(user?.lastname);
  normalizedUser.second_lastname = normalizeString(user?.second_lastname);
  normalizedUser.email = user?.email.trim();
  normalizedUser.fullname = `${normalizedUser?.firstname} ${normalizedUser?.lastname}`;

  return normalizedUser;
};
