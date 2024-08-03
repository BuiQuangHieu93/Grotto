import mongoose from "mongoose";
import { handleError } from "../utils";
import { connectToDatabase } from "../mongoose";
import Cart from "../models/cart.model";
import Furniture from "../models/product.models";
import {
  AddItemsParams,
  CartItem,
  DeleteItemParams,
  UpdateCartParams,
} from "@/types";

export const getCartByUserId = async (userId: mongoose.Types.ObjectId) => {
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

    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) throw new Error("Cart not found");

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
    return cart;
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
    return updatedCart;
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
    return cart;
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
    return cart;
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
