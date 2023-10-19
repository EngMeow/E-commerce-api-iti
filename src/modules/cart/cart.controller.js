import { catchAsyncError } from "../../../middleware/catchAsyncError.js";
import Cart from "../../../Database/models/cart.model.js";
import User from "../../../Database/models/user.model.js";
import { HttpStatus } from "../../../enums/httpStatus.js";
import { AppError } from "../../../utils/appError.js";

export const addCart = catchAsyncError(async (req, res, next) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ userId: req.user._id });
  if (cart) {
    const result = await Cart.findOneAndUpdate({ userId: req.user._id })
      .populate("products")
      .populate("userId", "name");
    res.json({ message: "Success", result });
  } else {
    const newCart = await Cart.insertMany({
      userId: req.user._id,
      products: [productId],
    });
    const result = await Cart.findOneAndUpdate(
      { userId: req.user._id },
      { $push: { products: productId } },
      { new: true }
    );

    res.json({ message: "Success", result });
  }
});
