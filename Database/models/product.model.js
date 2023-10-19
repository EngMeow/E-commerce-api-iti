import mongoose from "mongoose";

const opts = { toJSON: { virtuals: true } };

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      unique: [true, "Title is unique"],
      required: [true, "Title is required"],
      trim: true,
      minLength: [2, "Title is too short"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    priceAfterDiscount: {
      type: Number,
      min: 0,
    },
    rateAve: {
      type: Number,
      min: 0,
      max: 5,
    },
    ratingCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    description: {
      type: String,
      minLength: 5,
      maxLength: 300,
      trim: true,
      required: [true, "Description is required"],
    },
    quantity: {
      type: Number,
      default: 0,
      required: [true, "Quantity is required"],
    },
    sold: {
      type: Number,
      min: 0,
      default: 0,
    },
    imgCover: String,
    images: [String],
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
    subCategoryId: {
      type: mongoose.Types.ObjectId,
      ref: "subCategory",
    },
    brandId: {
      type: mongoose.Types.ObjectId,
      ref: "brand",
    },
  },
  { timestamps: true, ...opts }
);

productSchema.virtual("reviews", {
  ref: "review",
  localField: "_id",
  foreignField: "productId",
});

productSchema.pre(["find", "findOne"], function () {
  this.populate("reviews", "-productId comment rating");
});

productSchema.post("init", function (doc) {
  doc.images = doc.images.map((img) => "http://localhost:3000/product/" + img);
  doc.imgCover = "http://localhost:3000/product/" + doc.imgCover;
});

const Product = mongoose.model("Product", productSchema);

export default Product;
