import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Name is required"],
      trim: true,
      minLength: [2, "Name is too short"],
    },
    logo: String,
    slug: {
      type: String,
      lowercase: true,
      required: [true, "Slug is required"],
      unique: true,
    },
  },
  { timestamps: true }
);

brandSchema.post("init", (doc) => {
  if (doc.logo) {
    doc.logo = `http://localhost:3000/brand/${doc.logo}`;
  }
});

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
