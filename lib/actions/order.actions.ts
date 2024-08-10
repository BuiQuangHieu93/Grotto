"use server";

import Stripe from "stripe";
import { connectToDatabase } from "../mongoose";
import { handleError } from "../utils";
import Order from "../models/order.models";
import { OrderParams, CreateOrderParams } from "@/types";
import { redirect } from "next/navigation";

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
    if (session.url) {
      redirect(session.url);
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
