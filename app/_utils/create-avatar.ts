import { femenine, masculine } from "@/appUtils/avatars-config";

import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";

export const createAvatarImage = (person: Partial<UserPolicyInputs>) => {
  return createAvatar(lorelei, {
    seed: `${person.firstname}${person.lastname}${person.legal_status}`,
    hair: person.genre === "Femenino" ? femenine : masculine,
    beardProbability: person.genre === "Masculino" ? 50 : 0,
    earringsProbability: person.genre === "Femenino" ? 50 : 0,
  }).toDataUri();
};
