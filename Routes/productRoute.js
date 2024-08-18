const express = require("express");
const {
  getAllProducts,
  getProductDetails,
  createProduct,
} = require("../Controller/productController");
const { isAuthenticatedUser } = require("../Middleware/auth");
// const { isAuthenticatedUser, authorizedRoles } = require("../Middleware/auth");
const router = express.Router();

router.route("/create").get(createProduct);

router.route("/products").get(isAuthenticatedUser, getAllProducts);

router.route("/product/:id").get(getProductDetails);

module.exports = router;
