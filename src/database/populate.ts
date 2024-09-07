import { faker } from '@faker-js/faker';
import { productTable, type InsertProduct } from './schema';
import db from './drizzle';

// NOTE: Whenever running this process, change way api key is passed, as $env is not available

const maxPrice = 10_000;

const productAmount = 75;

function createRandomProduct(): InsertProduct {
	const startDate = faker.date.anytime();
	return {
		id: faker.string.uuid(),
		name: faker.commerce.productName(),
		description: faker.commerce.productDescription(),
		price: faker.number.float({ min: 1, max: maxPrice, fractionDigits: 2 }),
		startDate,
		endDate: faker.date.soon({ refDate: startDate, days: 15 })
	};
}

const products = [];

for (let i = 0; i < productAmount; i++) {
	products.push(createRandomProduct());
}

await db.insert(productTable).values(products);

console.log('Database has been populated with products');
