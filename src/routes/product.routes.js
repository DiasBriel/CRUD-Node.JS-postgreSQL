const router = require("express-promise-router")();
const productController = require("../controllers/product.controller");

//Create a new product
router.post("/products", productController.createProduct);

//List all of products
router.get("/products", productController.listAllProducts);

module.exports = router;
