import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Name is required"],
      trim: true,
      minLength: [2, "Name is too short"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: [true, "Slug is required"],
      unique: true,
    },
    img: String,
  },
  { timestamps: true }
);

categorySchema.post("init", (doc) => {
  if (doc.img) {
    doc.img = `http://localhost:3000/category/${doc.img}`;
  }
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
