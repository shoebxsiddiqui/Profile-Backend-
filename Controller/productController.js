const Product = require("../Models/productSchema");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures.js");
// const cloudinary = require("cloudinary");

//Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  console.log("hbs");
  // let images = [];
  // if (typeof req.body.images === "string") {
  //   images.push(req.body.images);
  // } else {
  //   images = req.body.images;
  // }

  const imagesLinks = [];

  // for (let i = 0; i < images.length; i++) {
  //   const result = await cloudinary.v2.uploader.upload(images[i], {
  //     folder: "products",
  //   });

  //   imagesLinks.push({
  //     public_id: result.public_id,
  //     url: result.secure_url,
  //   });
  // }

  req.body.images = imagesLinks;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const productsCount = await Product.countDocuments();
  const resultPerPage = 8;
  const features = new ApiFeatures(Product.find(), req.query).search().filter();

  let products = await features.query;
  const filteredProductsCount = products.length;

  features.pagination(resultPerPage);
  products = await features.query.clone();

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

//Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});
