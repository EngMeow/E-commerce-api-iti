import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Role } from "../../enums/role.js";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [2, "Name is too short"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: [2, "Email is too short"],
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "Password is too short"],
    },
    profilePic: String,
    role: {
      type: String,
      enum: [Role.USER, Role.ADMIN],
      default: Role.USER,
    },
    changePasswordAt: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    wishList: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Product",
      },
    ],
    addresses: [
      {
        city: String,
        street: String,
        phone: String,
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", function () {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
