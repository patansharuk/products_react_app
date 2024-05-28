import users from "./usersData";
import { faker } from "@faker-js/faker";

const dealerDetailsFactory = (id) => ({
    id: faker.string.uuid(),
    name: faker.lorem.words(),
    location: faker.location.city(),
    rating: faker.number.int({min: 1, max: 5}),
    user_id: id
})

const dealerDetails = [];

const dealers = users.filter((x) => x.role === "dealer");

for(let dealer of dealers){
    dealerDetails.push(dealerDetailsFactory(dealer.id))
}

export default dealerDetails;
