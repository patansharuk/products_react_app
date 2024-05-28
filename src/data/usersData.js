import { faker } from "@faker-js/faker";

const userFactory = (role) => ({
  id: faker.string.uuid(),
  name: faker.internet.userName(),
  email: faker.internet.email(),
  role: role,
  password: "123456",
  is_active: faker.number.int({min: 0, max: 1}),
});

const users = [];

for (let i = 0; i < 5; i++) {
  users.push(userFactory("admin"));
  users.push(userFactory("dealer"));
  users.push(userFactory("customer"));
}

export default users;
