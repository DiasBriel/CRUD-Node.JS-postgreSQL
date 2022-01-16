const db = require("../config/database");

// ==> Método responsável por criar um novo 'Product':

exports.createProduct = async (req, res) => {
  const { productname, quantity, price } = req.body;
  const { rows } = await db.query(
    "INSERT INTO products (productname, quantity, price) VALUES ($1, $2, $3)",
    [productname, quantity, price]
  );

  res.status(201).send({
    message: "Product added successfully!",
    body: {
      product: { productname, quantity, price },
    },
  });
};
