const router = require("express-promise-router")();
const productController = require("../controllers/product.controller");

//Create a new product
router.post("/products", productController.createProduct);

//List all of products
router.get("/products", productController.listAllProducts);

//Get product by ID
router.get("/products/:id", productController.findProductById);

module.exports = router;
