import User from "../../../Database/models/user.model.js";
import { HttpStatus } from "../../../enums/httpStatus.js";
import { catchAsyncError } from "../../../middleware/catchAsyncError.js";
import { AppError } from "../../../utils/appError.js";
import {
  createRecord,
  deleteRecord,
  getRecord,
  updateRecord,
} from "../../../utils/crudFactory.js";
import { getAllWithApiFeatures } from "../../../utils/getAllWithApiFeatures.js";

const modelName = "User";
const createUser = catchAsyncError(async (req, res, next) => {
  let { email } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res
      .status(HttpStatus.Conflict)
      .json({ message: "User already exists" });
  createRecord(modelName, User, req, res);
});

const getAllUsers = getAllWithApiFeatures(User);

const getUser = catchAsyncError(async (req, res, next) => {
  getRecord(modelName, User, req, res);
});

const updateUser = catchAsyncError(async (req, res, next) => {
  updateRecord(modelName, User, req, res);
});
const changeUserPassword = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const user = await userModel.findById(id);
  if (!user) next(new AppError("user not found", HttpStatus.NotFound));
  user.password = req.body.password;
  user.changePasswordAt = Date.now();
  await user.save();
  res.json({ message: "success", user });
});

const deleteUser = catchAsyncError(async (req, res, next) => {
  deleteRecord(modelName, User, req, res);
});

export {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
  changeUserPassword,
};
