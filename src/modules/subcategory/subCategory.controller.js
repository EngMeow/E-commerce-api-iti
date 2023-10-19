import { catchAsyncError } from "../../../middleware/catchAsyncError.js";
import Subcategory from "../../../Database/models/subCategory.js";
import slugify from "slugify";
import {
  createRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "../../../utils/crudFactory.js";
import { getAllWithApiFeatures } from "../../../utils/getAllWithApiFeatures.js";
const modelName = "SubCategory";
const createSubCategory = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;
  req.body.slug = slugify(name);
  createRecord(modelName, Subcategory, req, res);
});

const getAllSubCategories = getAllWithApiFeatures(Subcategory);

const getSubCategory = catchAsyncError(async (req, res, next) => {
  getRecord(modelName, Subcategory, req, res);
});

const updateSubCategory = catchAsyncError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  updateRecord(modelName, Subcategory, req, res);
});

const deleteSubCategory = catchAsyncError(async (req, res, next) => {
  deleteRecord(modelName, Subcategory, req, res);
});
export {
  getAllSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  createSubCategory,
};
