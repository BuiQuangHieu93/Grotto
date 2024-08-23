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

export const calculateTotalEarnings = async () => {
  try {
    await connectToDatabase();
    const orders = await Order.find({
      status: { $in: ["Paid", "Shipped", "Delivered"] },
    });

    const totalEarnings = orders.reduce((acc, order) => {
      return acc + order.totalPrice;
    }, 0);

    return JSON.parse(JSON.stringify(totalEarnings));
  } catch (error) {
    console.error("Error calculating total earnings:", error);
    throw error;
  }
};

export const calculateEarningsChange = async () => {
  try {
    await connectToDatabase();
    const now = new Date();

    // Calculate the start and end dates for the two periods
    const start1 = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 30
    );
    const start2 = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 60
    );

    // Calculate earnings for the 1st to 30th day period
    const earnings1To30 = await Order.aggregate([
      {
        $match: {
          status: { $in: ["Paid", "Shipped", "Delivered"] },
          createdAt: { $gte: start1, $lt: now },
        },
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: "$totalPrice" },
        },
      },
    ]);

    // Calculate earnings for the 31st to 60th day period
    const earnings31To60 = await Order.aggregate([
      {
        $match: {
          status: { $in: ["Paid", "Shipped", "Delivered"] },
          createdAt: { $gte: start2, $lt: start1 },
        },
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: "$totalPrice" },
        },
      },
    ]);

    // Extract total earnings from the aggregation results
    const totalEarnings1To30 =
      earnings1To30.length > 0 ? earnings1To30[0].totalEarnings : 0;
    const totalEarnings31To60 =
      earnings31To60.length > 0 ? earnings31To60[0].totalEarnings : 0;

    let changeInEarnings: string | number;

    if (totalEarnings31To60 === 0) {
      if (totalEarnings1To30 === 0) {
        changeInEarnings = 0; // No earnings in either period
      } else {
        changeInEarnings = ">1000"; // Cap the percentage increase at 1000%
      }
    } else {
      changeInEarnings = (
        ((totalEarnings1To30 - totalEarnings31To60) * 100) /
        totalEarnings31To60
      ).toFixed(2);

      if (parseFloat(changeInEarnings) > 1000) {
        changeInEarnings = ">1000"; // Cap the percentage increase at 1000%
      }
    }

    return JSON.parse(JSON.stringify(changeInEarnings));
  } catch (error) {
    console.error("Error calculating earnings change:", error);
    throw error;
  }
};

export const calculateOrderChange = async () => {
  try {
    await connectToDatabase();
    const now = new Date();

    // Calculate the start and end dates for the two periods
    const start1 = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 30
    );
    const start2 = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 60
    );

    // Count orders for the 1st to 30th day period
    const orders1To30 = await Order.countDocuments({
      status: { $in: ["Paid", "Shipped", "Delivered"] },
      createdAt: { $gte: start1, $lt: now },
    });

    // Count orders for the 31st to 60th day period
    const orders31To60 = await Order.countDocuments({
      status: { $in: ["Paid", "Shipped", "Delivered"] },
      createdAt: { $gte: start2, $lt: start1 },
    });

    let changeInOrders: string | number;

    if (orders31To60 === 0) {
      if (orders1To30 === 0) {
        changeInOrders = 0; // No orders in either period
      } else {
        changeInOrders = ">1000"; // Cap the percentage increase at 1000%
      }
    } else {
      changeInOrders = (
        ((orders1To30 - orders31To60) * 100) /
        orders31To60
      ).toFixed(2);

      if (parseFloat(changeInOrders) > 1000) {
        changeInOrders = ">1000"; // Cap the percentage increase at 1000%
      }
    }

    return JSON.parse(JSON.stringify(changeInOrders));
  } catch (error) {
    console.error("Error calculating order change:", error);
    throw error;
  }
};

export const revenue = async () => {
  try {
    await connectToDatabase();

    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const revenueData = await Order.aggregate([
      {
        $match: {
          status: { $in: ["Paid", "Shipped", "Delivered"] },
          createdAt: { $gte: startOfYear },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalEarnings: { $sum: "$totalPrice" },
          orderCount: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Format the response to include month names
    const formattedData = revenueData.map((data) => ({
      month: new Date(0, data._id - 1).toLocaleString("default", {
        month: "long",
      }),
      totalEarnings: data.totalEarnings,
      orderCount: data.orderCount,
    }));

    return JSON.parse(JSON.stringify(formattedData));
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    handleError(error);
  }
};
