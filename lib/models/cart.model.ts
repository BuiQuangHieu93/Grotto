import mongoose, { Schema, model, models } from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: "User",
    required: true,
  },
  items: [
    {
      product: {
        type: String,
        ref: "Furniture",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Cart = models.Cart || model("Cart", cartSchema);

export default Cart;
