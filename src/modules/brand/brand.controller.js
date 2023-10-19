import slugify from "slugify";
import { catchAsyncError } from "../../../middleware/catchAsyncError.js";
import {
  createRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "../../../utils/crudFactory.js";
import Brand from "../../../Database/models/brand.model.js";
import { getAllWithApiFeatures } from "../../../utils/getAllWithApiFeatures.js";

const modelName = "Brand";

const createBrand = catchAsyncError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  req.body.logo = req.file.filename;
  createRecord(modelName, Brand, req, res);
});

const getAllBrands = getAllWithApiFeatures(Brand);

const getBrand = catchAsyncError(async (req, res, next) => {
  getRecord(modelName, Brand, req, res);
});
const updateBrand = catchAsyncError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  req.body.logo = req.file.filename;
  updateRecord(modelName, Brand, req, res);
});

const deleteBrand = catchAsyncError(async (req, res, next) => {
  deleteRecord(modelName, Brand, req, res);
});

export { getAllBrands, getBrand, updateBrand, deleteBrand, createBrand };
