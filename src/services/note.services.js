const { Product } = require('#models/index.js');
const { promiseResolver } = require('#utils/index.js');

async function calculateNotePrice(data, res) {
  const productsId = data.map((item) => item.product);
  const productQuery = { _id: { $in: productsId } };
  const productProjection = 'price';

  const [products, productQueryError] = await promiseResolver(
    Product.find(productQuery, productProjection),
  );

  if (productQueryError) {
    return res.json({
      status: 'error',
      // code: error.serverError.code,
      // message: error.serverError.message,
    });
  }

  const totalPrice = products.reduce((prev, next) => prev + next.price, 0);

  return totalPrice;
}

module.exports = { calculateNotePrice };
