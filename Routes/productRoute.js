const express = require("express");
const {
  getAllProducts,
  getProductDetails,
  createProduct,
} = require("../Controller/productController");
// const { isAuthenticatedUser, authorizedRoles } = require("../Middleware/auth");
const router = express.Router();

router.route("/create").post(createProduct);

router.route("/products").get(getAllProducts);

router.route("/product/:id").get(getProductDetails);

module.exports = router;
