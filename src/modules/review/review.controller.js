import { catchAsyncError } from "../../../middleware/catchAsyncError.js";
import Review from "../../../Database/models/review.model.js";
import {
  createRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "../../../utils/crudFactory.js";
import { HttpStatus } from "../../../enums/httpStatus.js";
import { AppError } from "../../../utils/appError.js";
import { getAllWithApiFeatures } from "../../../utils/getAllWithApiFeatures.js";

const modelName = "Review";
const createReview = catchAsyncError(async (req, res, next) => {
  req.body.userId = req.user._id;
  const isReview = await Review.findOne({
    userId: req.user._id,
    productId: req.body.productId,
  });

  if (!isReview)
    return next(
      new AppError("You created a review before", HttpStatus.Conflict)
    );
  createRecord(modeName, Review, req, res);
});

const getAllReviews = getAllWithApiFeatures(Review);

const getReview = catchAsyncError(async (req, res, next) => {
  getRecord(modelName, Review, req, res);
});
const updateReview = catchAsyncError(async (req, res, next) => {
  updateRecord(modeName, Review, req, res);
});

const deleteReview = catchAsyncError(async (req, res, next) => {
  deleteRecord(modeName, Review, req, res);
});

export { getAllReviews, getReview, updateReview, deleteReview, createReview };
