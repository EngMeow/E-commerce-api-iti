import mongoose from "mongoose";

const schema = mongoose.Schema({
  code: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  discount: {
    type: Number,
    min: 0,
    required: true,
  },
  expire: {
    type: Date,
  },
});

const Coupon = mongoose.model("Coupon", schema);

export default Coupon;
