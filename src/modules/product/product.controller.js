import slugify from "slugify";
import { HttpStatus } from "../../../enums/httpStatus.js";
import Product from "../../../Database/models/product.model.js";
import { getAllWithApiFeatures } from "../../../utils/getAllWithApiFeatures.js";
import { catchAsyncError } from "../../../middleware/catchAsyncError.js";
import {
  createRecord,
  getRecord,
  updateRecord,
  deleteRecord,
} from "../../../utils/crudFactory.js";
import { AppError } from "../../../utils/appError.js";

const modelName = "Product";

const createProduct = catchAsyncError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  req.body.imgCover = req.files.imgCover[0].filename;
  req.body.images = req.files.images.map((img) => img.filename);
  if (!req.body.images)
    return next(new AppError("Images do not exist"), HttpStatus.NotFound);

  createRecord(modelName, Product, req, res);
});

const getAllProducts = getAllWithApiFeatures(Product);

const getProduct = catchAsyncError(async (req, res, next) => {
  getRecord(modelName, Product, req, res);
});

const updateProduct = catchAsyncError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  req.body.imgCover = req.files.imgCover[0].filename;
  req.body.images = req.files.images.map((img) => img.filename);
  updateRecord(modelName, Product, req, res);
});

const deleteProduct = catchAsyncError(async (req, res, next) => {
  deleteRecord(modelName, Product, req, res);
});

export {
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  createProduct,
};
