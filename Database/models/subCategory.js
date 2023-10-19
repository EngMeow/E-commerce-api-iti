import mongoose from "mongoose";

const schemaSubCategory = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minLength: [2, "Name is too short"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
  },
  { timestamps: true }
);

const Subcategory = mongoose.model("Subcategory", schemaSubCategory);

export default Subcategory;
