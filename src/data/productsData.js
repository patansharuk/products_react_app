import dealerDetails from "./dealersData";
import { faker } from "@faker-js/faker";

const productsFactory = (id) => ({
    id: faker.string.uuid(),
    title: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price({min: 0, max: 10000, dec: 0, symbol: '$'}),
    image_url: faker.image.urlPicsumPhotos(),
    dealer_detail_id: id
})

const products = []

for(let dealerDetail of dealerDetails){
    for(let i=0; i<5; i++){
        products.push(productsFactory(dealerDetail.id))
    }
}

export default products