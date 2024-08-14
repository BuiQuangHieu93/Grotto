"use server";

import Stripe from "stripe";
import { connectToDatabase } from "../mongoose";
import { handleError } from "../utils";
import Order from "../models/order.models";
import { OrderParams, CreateOrderParams, UpdateOrderParams } from "@/types";
import { updateFurniture } from "./product.actions";

export const checkoutOrder = async (order: OrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: order.items.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: item.product.salePrice
            ? Math.round(item.product.salePrice * 100)
            : Math.round(item.product.originalPrice * 100),
          product_data: {
            name: item.product.title,
          },
        },
        quantity: item.quantity,
      })),
      metadata: {
        userId: order.userId,
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/home`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    const stripeId = session.id;

    await createOrder({
      stripeId,
      userId: order.userId,
      items: order.items.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        price: item.product.salePrice
          ? Math.round(item.product.salePrice)
          : Math.round(item.product.originalPrice),
      })),
      totalPrice: order.totalPrice,
      paymentMethod: "Stripe",
      status: "Pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await Promise.all(
      order.items.map((item) =>
        updateFurniture(item.product._id, {
          available: item.product.available - item.quantity,
        })
      )
    );

    // Redirect to the Stripe checkout session URL
    if (session.url) {
      return {
        redirect: session.url,
      };
    }
  } catch (error) {
    handleError(error);
  }
};

export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDatabase();

    const newOrder = await Order.create(order);

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
};

export const updateOrder = async (order: UpdateOrderParams) => {
  try {
    await connectToDatabase();

    const { userId, stripeId, status } = order;

    // Log the order being updated
    console.log("Updating order with userId:", userId);

    const latestOrder = await Order.findOne({ userId: userId })
      .sort({ createdAt: -1 }) // Assuming you have a `createdAt` field for ordering
      .exec();

    if (!latestOrder) {
      console.log("No orders found for the user.");
      return null; // Return null if no order is found
    }

    // Update the latest order
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: latestOrder._id },
      { stripeId: stripeId, status: status },
      { new: true }
    ).exec();

    console.log("Updated order:", updatedOrder);

    return JSON.parse(JSON.stringify(updatedOrder));
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const getAllOrders = async () => {
  try {
    await connectToDatabase(); // Ensure you await the connection
    const orders = await Order.find({});
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    handleError(error);
  }
};
