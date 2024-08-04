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

export const getCartByUserId = async (userId: String) => {
  try {
    await connectToDatabase();

    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) throw new Error("Cart not found");

    return JSON.parse(JSON.stringify(cart));
  } catch (error) {
    handleError(error);
  }
};

export const addItemsToCart = async ({ userId, items }: AddItemsParams) => {
  try {
    await connectToDatabase();

    let cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      await createCart({
        user: userId,
        items: [],
        totalPrice: 0,
      });
      cart = await Cart.findOne({ user: userId }).populate("items.product");
    }

    items.forEach((newItem) => {
      const existingItem = cart.items.find(
        (item: any) =>
          item.product._id.toString() === newItem.product.toString()
      );
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        cart.items.push(newItem);
      }
    });

    cart.totalPrice = await calculateTotalPrice(cart.items);
    await cart.save();
    return JSON.parse(JSON.stringify(cart));
  } catch (error) {
    handleError(error);
  }
};

export const updateCart = async ({
  userId,
  items,
  totalPrice,
}: UpdateCartParams) => {
  try {
    await connectToDatabase();

    const updatedCart = await Cart.findOneAndUpdate(
      { user: userId },
      { items, totalPrice },
      { new: true, runValidators: true }
    ).populate("items.product");

    if (!updatedCart) throw new Error("Cart not found");
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

    const cart = await Cart.findOne({ user: userId }).populate("items.product");
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

export const clearCart = async (userId: mongoose.Types.ObjectId) => {
  try {
    await connectToDatabase();

    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new Error("Cart not found");

    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();
    return JSON.parse(JSON.stringify(cart));
  } catch (error) {
    handleError(error);
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
