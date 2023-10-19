import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  comment: {
    type: String,
    trim: true,
    minLength: [2, "Comment is too short"],
  },
  productId: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
});

reviewSchema.pre(["find", "findOne"], function () {
  this.populate("userId", "name -_id");
});

const Review = mongoose.model("review", reviewSchema);

export default Review;
