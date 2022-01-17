const db = require("../config/database");

// ==> Método responsável por criar um novo 'Product':

const createProduct = async (req, res) => {
  const { productname, quantity, price } = req.body;
  const { rows } = await db.query(
    `INSERT INTO products (productname, quantity, price) VALUES ($1, $2, $3)`,
    [productname, quantity, price]
  );

  res.status(201).send({
    message: "Product added successfully!",
    body: {
      product: { productname, quantity, price },
    },
  });
};

const listAllProducts = async (req, res) => {
  const response = await db.query(
    "SELECT * FROM products ORDER BY productname ASC"
  );
  res.status(200).send(response.rows);
};

const findProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  const response = await db.query(
    `SELECT * FROM products WHERE productid = ${productId}`
  );
  res.status(200).send(response.rows);
};

const updateProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  const { productname, quantity, price } = req.body;

  await db.query(
    "UPDATE products SET productname = $1, quantity = $2, price = $3 WHERE productId = $4",
    [productname, quantity, price, productId]
  );

  res.status(200).send({ message: "Product updated successfully!" });
};

/*
For more flexibility in PATCH method,
the function below is a little bit more complex
*/
const patchProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  const { body } = req;

  //get the body size to use this value inside the loop function
  const bodySize = Object.keys(body).length;

  //create a 'query' variable that will be responsible for building the query string
  let query = "UPDATE products SET";

  //the array 'callBackArray' get the values of updated rows and pass in db.query
  let callBackArray = [];

  //for loop responsible for creating the query string
  for (let i = 0; i < bodySize; i++) {
    const currentKey = Object.keys(body);
    const queryFragment = ` ${currentKey[i]} = $${i + 1}`;

    i === bodySize - 1
      ? (query = query + queryFragment)
      : (query = query + queryFragment + ",");

    callBackArray.push(body[currentKey[i]]);
  }

  //add productId in query string
  query = query + ` WHERE productId = ${productId}`;

  await db.query(query, callBackArray);

  res
    .status(200)
    .send({ message: "Product information updated successfully!" });
};

module.exports = {
  createProduct,
  listAllProducts,
  findProductById,
  updateProductById,
  patchProductById,
};
