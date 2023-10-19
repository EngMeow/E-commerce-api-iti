import mongoose from "mongoose";
import User from "../../../Database/models/user.model.js";
import { HttpStatus } from "../../../enums/httpStatus.js";
import { catchAsyncError } from "../../../middleware/catchAsyncError.js";
import { AppError } from "../../../utils/appError.js";

export const addAddress = catchAsyncError(async (req, res, next) => {
  const result = await User.findByIdAndUpdate(
    req.user._id,
    { $push: { addresses: req.body } },
    { new: true }
  );

  if (!result) {
    return next(new AppError(`Can't add to address`, HttpStatus.NotFound));
  }

  res.json({ message: "Success", result: result.addresses });
});

export const removeAddress = catchAsyncError(async (req, res, next) => {
  const result = await User.findByIdAndUpdate(
    req.user._id,
    { $pull: { addresses: { _id: req.params.id } } },
    { new: true }
  );

  if (!result) {
    return next(new AppError("Can't remove address", HttpStatus.NotFound));
  }

  res.json({ message: "Success", result: result.addresses });
});

export const getAllAddresses = catchAsyncError(async (req, res, next) => {
  const result = await User.findById(req.user._id);

  if (!result) {
    return next(new AppError("Can't get addresses", HttpStatus.NotFound));
  }

  res.json({ message: "Success", result: result.addresses });
});

export const getAddress = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const result = await User.findOne({
    "addresses._id": new mongoose.Types.ObjectId(id),
  });
  console.log(result);
  if (!result) {
    return next(new AppError("Can't get address", HttpStatus.NotFound));
  }

  res.json({ message: "Success", result: result });
});
