import { ICart } from "@/types";
import { Schema, model, models } from "mongoose";

const cartSchema = new Schema<ICart>({
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
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
