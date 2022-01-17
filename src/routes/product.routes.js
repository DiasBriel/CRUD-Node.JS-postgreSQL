const router = require("express-promise-router")();
const productController = require("../controllers/product.controller");

//Create a new product
router.post("/products", productController.createProduct);

//List all of products
router.get("/products", productController.listAllProducts);

//Get product by ID
router.get("/products/:id", productController.findProductById);

//Update product by ID
router.put("/products/:id", productController.updateProductById);

//Patch a product by ID
router.patch("/products/:id", productController.patchProductById);

//Delete product
router.delete("/products/:id", productController.deleteProductById);

module.exports = router;
