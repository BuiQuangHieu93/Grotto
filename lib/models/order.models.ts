import { Schema, model, models } from "mongoose";

const orderSchema = new Schema({
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
  // items: [
  //   {
  //     product: {
  //       type: String,
  //       ref: "Furniture",
  //       required: true,
  //     },
  //     quantity: {
  //       type: Number,
  //       required: true,
  //       min: 1,
  //     },
  //     price: {
  //       type: Number,
  //       required: true,
  //     },
  //   },
  // ],
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Paid", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = models.Order || model("Order", orderSchema);

export default Order;
