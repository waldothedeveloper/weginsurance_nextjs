import { FakeUser } from "@/interfaces/index";
import { faker } from "@faker-js/faker/locale/es";

export const createRandomUser = (): FakeUser => {
  const gender = faker.name.sexType();

  const activeUser = faker.datatype.boolean();
  const firstname = faker.name.firstName(gender);
  const secondName = faker.name.middleName(gender);
  const lastname = faker.name.lastName();
  const secondLastname = faker.name.firstName(gender);
  const fullname = `${firstname} ${lastname}`;
  const email = faker.helpers.unique(faker.internet.email, [
    firstname,
    lastname,
  ]);
  const notes = faker.lorem.paragraph(2);
  const phone = faker.phone.number("+1#########");

  return {
    firstTimeVisit: false,
    id: faker.datatype.uuid(),
    fullname,
    activeUser,
    avatar: faker.image.avatar(),
    email,
    firstname,
    insuranceCompany: faker.helpers.arrayElement([
      "Aetna",
      "Anthem",
      "Blue Cross Blue Shield",
      "Cigna",
      "Humana",
      "United Healthcare",
      "Assurant",
      "Florida Blue",
      "Medicare",
      "Oscar",
    ]),
    lastname,
    gender,
    notes,
    phone,
    secondLastname,
    secondName,
  };
};
