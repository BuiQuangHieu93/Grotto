"use server";

import mongoose from "mongoose";
import { handleError } from "../utils";
import { connectToDatabase } from "../mongoose";
import Cart from "../models/cart.model";
import Furniture from "../models/product.models";
import {
  AddItemsParams,
  CartItem,
  CreateCartParams,
  DeleteItemParams,
  UpdateCartParams,
} from "@/types";

export const createCart = async (cart: CreateCartParams) => {
  try {
    connectToDatabase();
    const newCart = await Cart.create(cart);
    return JSON.parse(JSON.stringify(newCart));
  } catch (error) {
    handleError(error);
  }
};

export const getCartByUserId = async (userId: string) => {
  try {
    await connectToDatabase();

    const cart = await Cart.findOne({ userId: userId }).populate(
      "items.product"
    );
    if (!cart) {
      await createCart({
        userId: userId,
        items: [],
        totalPrice: 0,
      });
      await Cart.findOne({ userId: userId });
    }

    return JSON.parse(JSON.stringify(cart));
  } catch (error) {
    handleError(error);
  }
};

export const addItemsToCart = async ({ userId, items }: AddItemsParams) => {
  try {
    await connectToDatabase();

    let cart = await Cart.findOne({ userId: userId }).populate("items.product");

    if (!cart) {
      // Create a new cart if one doesn't exist
      cart = new Cart({
        userId: userId,
        items: [],
        totalPrice: 0,
      });
    }

    items.forEach((newItem) => {
      console.log("New Item Product ID:", newItem.product._id.toString());

      const existingItem = cart.items.find((item: any) => {
        console.log("Existing Item Product ID:", item.product._id.toString());
        return item.product._id.toString() === newItem.product._id.toString();
      });

      if (existingItem) {
        // Update the quantity if the item already exists in the cart
        existingItem.quantity += newItem.quantity;
      } else {
        // Add new item to the cart if it doesn't exist
        cart.items.push(newItem);
      }
    });

    // Recalculate the total price
    cart.totalPrice = await calculateTotalPrice(cart.items);
    await cart.save();

    return JSON.parse(JSON.stringify(cart));
  } catch (error) {
    handleError(error);
  }
};

export const updateCart = async ({ userId, items }: UpdateCartParams) => {
  try {
    await connectToDatabase();

    const updatedCart = await Cart.findOneAndUpdate(
      { userId: userId },
      { items },
      { new: true }
    ).populate("items.product");

    if (!updatedCart) throw new Error("Cart not found");

    // Recalculate total price
    updatedCart.totalPrice = await calculateTotalPrice(updatedCart.items);
    await updatedCart.save();

    return JSON.parse(JSON.stringify(updatedCart));
  } catch (error) {
    handleError(error);
  }
};

export const deleteItemInCart = async ({
  userId,
  productId,
}: DeleteItemParams) => {
  try {
    await connectToDatabase();

    const cart = await Cart.findOne({ userId: userId }).populate(
      "items.product"
    );
    if (!cart) throw new Error("Cart not found");

    cart.items = cart.items.filter(
      (item: any) => item.product._id.toString() !== productId.toString()
    );
    cart.totalPrice = await calculateTotalPrice(cart.items);

    await cart.save();
    return JSON.parse(JSON.stringify(cart));
  } catch (error) {
    handleError(error);
  }
};

export const clearCart = async (userId: string) => {
  try {
    await connectToDatabase();

    const cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      console.error(`Cart not found for userId: ${userId}`);
      throw new Error("Cart not found");
    }

    console.log(`Clearing cart for userId: ${userId}`);

    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();

    console.log(`Cart cleared successfully for userId: ${userId}`);
    return JSON.parse(JSON.stringify(cart));
  } catch (error) {
    console.error("Error clearing cart:", error);
    handleError(error);
    throw error; // Re-throw the error for further inspection
  }
};

// Helper function to calculate total price
const calculateTotalPrice = async (items: CartItem[]) => {
  let totalPrice = 0;
  for (const item of items) {
    const product = await Furniture.findById(item.product).select(
      "originalPrice salePrice"
    );
    if (product) {
      const price = product.salePrice ?? product.originalPrice;
      totalPrice += price * item.quantity;
    }
  }
  return totalPrice;
};
