// Seed database for one user.

const { faker } = require('@faker-js/faker');
const _ = require('lodash');

const { Product, Note, User } = require('../../models/index.js');
const mongoConnect = require('./mongo-connect.js');
const { mongoUrl } = require('../../config/index.js');
const { promiseResolver } = require('../../utils/helpers.js');

faker.seed(42);

// Test user.
const userId = '64abad8c17ad1dd176b7df40';
const categories = ['food', 'beverage', 'vegetables', 'dairy', 'meat', 'fruit'];
const units = ['g', 'kg', 'ml', 'l', 'pcs'];
const stores = ['Alfamart', 'Indomaret', 'Soen Swalayan'];
const maxImageAmount = 5;
const maxCategoryAmount = 3;

async function createProducts(amount) {
  const products = [];

  for (let n = 0; n < amount; n += 1) {
    const imageAmount = Math.floor(Math.random() * maxImageAmount) + 1;
    const categoryAmount = Math.floor(Math.random() * maxCategoryAmount) + 1;
    const price = faker.commerce.price({ min: 1000, max: 10000 });
    const netto = faker.number.int({ min: 10, max: 100 });
    const pricePerUnit = Math.floor((price / netto) * 100) / 100;

    const newProduct = {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      images: Array(imageAmount)
        .fill()
        .map(() => faker.image.urlLoremFlickr({ category: 'food' })),
      categories: Array(categoryAmount)
        .fill()
        .map(() => _.sample(categories)),
      price,
      netto,
      unit: _.sample(units),
      pricePerUnit,
      store: _.sample(stores),
      pinned: false,
      author: userId,
      created: faker.date.recent({ days: 10 }),
    };

    products.push(newProduct);
  }

  // Save to database.
  const [newProducts, productCreateError] = await promiseResolver(
    Product.create(products),
  );

  if (productCreateError) {
    console.error('Product create error.', productCreateError);

    return undefined;
  }

  console.log(`Successfully generated ${amount} products.`);

  return newProducts;
}

async function productSeeder(amount) {
  await Product.deleteMany({});
  console.log('Product list reset success.');

  const products = await createProducts(amount);

  return products;
}

async function createNotes(amount, products) {
  const notes = [];
  const maxProductAmount = products.length;

  for (let n = 0; n < amount; n += 1) {
    const productAmount = Math.floor(Math.random() * maxProductAmount) + 1;
    const productList = Array(productAmount)
      .fill()
      .map(() => _.sample(products));

    const newNote = {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      products: productList.map((product) => product._id),
      price: productList.reduce((prev, next) => prev + next.price, 0),
      author: userId,
    };

    notes.push(newNote);
  }

  // Save to database.
  const [newNotes, noteCreateError] = await promiseResolver(Note.create(notes));

  if (noteCreateError) {
    console.error('Note create error.', noteCreateError);

    return undefined;
  }

  console.log(`Successfully generated ${amount} notes.`);

  return newNotes;
}

async function noteSeeder(amount, products) {
  await Note.deleteMany({});
  console.log('Note list reset success.');

  const notes = await createNotes(amount, products);

  return notes;
}

/* ===================================================================== */

async function startSeeder(productAmount, noteAmount) {
  const dbConnection = mongoConnect(mongoUrl);

  /* ======================= Products ======================= */

  const products = await productSeeder(productAmount);

  console.log(
    '🚀 ~ file: mongo-seeder.js:118 ~ startSeeder ~ products:',
    products,
  );

  /* ======================= Notes ======================= */

  const notes = await noteSeeder(noteAmount, products);

  console.log('🚀 ~ file: mongo-seeder.js:124 ~ startSeeder ~ notes:', notes);

  dbConnection.close();
}

startSeeder(5, 2);
