import { FakeUser } from "@/interfaces/index";
import { faker } from "@faker-js/faker/locale/es";

export const createRandomUser = (): FakeUser => {
  const gender = faker.person.sexType();

  const activeUser = faker.datatype.boolean();
  const firstname = faker.person.firstName(gender);
  const secondName = faker.person.middleName(gender);
  const lastname = faker.person.lastName();
  const secondLastname = faker.person.firstName(gender);
  const fullname = `${firstname} ${lastname}`;
  const email = faker.internet.email({
    firstName: firstname || undefined,
    lastName: lastname || undefined,
  });

  const notes = faker.lorem.paragraph(2);
  const phone = faker.phone.number("+1#########");

  return {
    firstTimeVisit: false,
    id: faker.string.uuid(),
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
