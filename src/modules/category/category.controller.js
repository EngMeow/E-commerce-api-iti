import slugify from "slugify";
import Category from "../../../Database/models/category.model.js";
import {
  createRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "../../../utils/crudFactory.js";
import { catchAsyncError } from "../../../middleware/catchAsyncError.js";
import { getAllWithApiFeatures } from "../../../utils/getAllWithApiFeatures.js";

const modelName = "Category";
const createCategory = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;
  req.body.slug = slugify(name);
  req.body.img = req.file.filename;
  createRecord(modelName, Category, req, res);
});

const getAllCategories = getAllWithApiFeatures(Category);

const getCategory = catchAsyncError(async (req, res, next) => {
  getRecord(modelName, Category, req, res);
});

const updateCategory = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;
  req.body.slug = slugify(name);
  req.body.img = req.file.filename;
  updateRecord(modelName, Category, req, res);
});

const deleteCategory = catchAsyncError(async (req, res, next) => {
  deleteRecord(modelName, Category, req, res);
});

export {
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  createCategory,
};
