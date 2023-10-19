import bcrypt from "bcryptjs";
import { generateToken } from "../../../utils/generateToken.js";
import User from "../../../Database/models/user.model.js";
import { HttpStatus } from "../../../enums/httpStatus.js";
import { catchAsyncError } from "../../../middleware/catchAsyncError.js";
import { AppError } from "../../../utils/appError.js";

export const signIn = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(
      new AppError("Incorrect email or password", HttpStatus.Unauthorized)
    );
  }

  const token = generateToken({ id: user._id, role: user.role });
  res.json({ message: "Success", token });
});
