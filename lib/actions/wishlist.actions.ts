"use server";

import { IFurniture } from "@/types";
import { connectToDatabase } from "../mongoose";
import { handleError } from "../utils";
import Wishlist from "../models/wishlist.models";
import { Types } from "mongoose";

export const addProductToWishlist = async (
  userId: string,
  product: IFurniture
) => {
  try {
    await connectToDatabase();
    let wishlist = await Wishlist.findOne({ clerkId: userId });

    if (!wishlist) {
      wishlist = new Wishlist({
        clerkId: userId,
        wishlist: [product],
      });
      await wishlist.save();
    } else {
      const productExists = wishlist.wishlist.some(
        (item: IFurniture) => item._id.toString() === product._id.toString()
      );

      if (!productExists) {
        wishlist.wishlist.push(product);
        await wishlist.save();
      } else {
        console.log("Product already in wishlist");
      }
    }

    // Populate the wishlist with full product details
    const populatedWishlist = await wishlist.populate("wishlist");

    // Return the fully populated wishlist
    return JSON.parse(JSON.stringify(populatedWishlist));
  } catch (error) {
    handleError(error);
  }
};

export const getWishlistById = async (userId: string) => {
  try {
    await connectToDatabase();
    const wishlist = await Wishlist.findOne({ clerkId: userId }).populate<{
      wishlist: IFurniture[];
    }>("wishlist");

    return wishlist ? JSON.parse(JSON.stringify(wishlist.wishlist)) : [];
  } catch (error) {
    handleError(error);
  }
};

export const removeProductInWishlist = async (
  userId: string,
  product: IFurniture
) => {
  try {
    await connectToDatabase();
    const wishlist = await Wishlist.findOne({ clerkId: userId });

    if (wishlist) {
      wishlist.wishlist = wishlist.wishlist.filter(
        (item: IFurniture) => item._id.toString() !== product._id.toString()
      );
      await wishlist.save();
    }
    const newWishlist = await wishlist.populate("wishlist");
    return JSON.parse(JSON.stringify(newWishlist));
  } catch (error) {
    handleError(error);
  }
};

export const checkProductWishlist = async (
  userId: string,
  data: IFurniture
): Promise<boolean> => {
  try {
    await connectToDatabase();
    const wishlist = await Wishlist.findOne({ clerkId: userId });

    if (wishlist) {
      const productExists = wishlist.wishlist.some(
        (item: IFurniture) => item._id.toString() === data._id.toString()
      );
      return productExists;
    }
    return false;
  } catch (error) {
    handleError(error);
    return false;
  }
};
