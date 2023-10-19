import User from "../../../Database/models/user.model.js";
import { HttpStatus } from "../../../enums/httpStatus.js";
import { catchAsyncError } from "../../../middleware/catchAsyncError.js";
import { AppError } from "../../../utils/appError.js";

export const addToWishList = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const result = await User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { wishList: id } },
    { new: true }
  );
  if (!result) {
    return next(
      new AppError(`Unable to add to the wishlist`, HttpStatus.NotFound)
    );
  }
  res.json({ message: "Success", result: result.wishList });
});

export const removeFromWishList = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const result = await User.findByIdAndUpdate(
    req.user._id,
    { $pull: { wishList: id } },
    { new: true }
  );
  if (!result) {
    return next(
      new AppError(`Unable to remove from the wishlist`, HttpStatus.NotFound)
    );
  }
  res.json({ message: "Success", result: result.wishList });
});

export const getAllWishList = catchAsyncError(async (req, res, next) => {
  const result = await User.findById(req.user._id).populate("wishList");
  if (!result) {
    return next(new AppError(`Wishlist not found`, HttpStatus.NotFound));
  }
  res.json({ message: "Success", result: result.wishList });
});
