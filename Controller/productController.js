const Product = require("../Models/productSchema");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures.js");
// const cloudinary = require("cloudinary");

//Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const response = await fetch("https://fakestoreapi.com/products");
  const zz = await response.json();

  const stocks = [88, 66, 27, 873, 27, 3, 10, 3, 4, 7];
  const brands = [
    "ZenithWare",
    "NovaTrend",
    "AeroFusion",
    "PixelPeak",
    "EchoLux",
    "QuantumEdge",
    "VortexVibe",
    "StellarLine",
    "LuxeFusion",
    "NebulaNex",
  ];
  const discounts = [5, 0, 10, 25, 50, 0, 0];
  const products = [];
  for (const key of zz) {
    const imageLinks = key.image;
    const stock = stocks[Math.floor(Math.random() * stocks.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const dis = discounts[Math.floor(Math.random() * discounts.length)];
    const price = Math.round(key.price);
    const discountPrice = Math.round((price * (100 - dis)) / 100);

    const obj = {
      title: key.title,
      description: key.description,
      price,
      countRatings: key.rating.count,
      ratings: key.rating.rate,
      images: imageLinks,
      category: key.category,
      Stock: stock,
      brand: brand,
      discount: dis,
      discountPrice,
    };
    products.push(await Product.create(obj));
  }

  res.status(201).json({
    success: true,
    products,
  });
});

//Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const productsCount = await Product.countDocuments();
  const resultPerPage = 24;
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
