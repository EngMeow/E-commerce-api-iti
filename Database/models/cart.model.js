import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  products: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "product",
    },
  ],
  totalPrice: Number,
  totalPriceAfterDiscount: Number,
  discount: {
    type: mongoose.Types.ObjectId,
    ref: "coupon",
  },
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
