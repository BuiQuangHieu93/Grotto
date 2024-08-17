"use server";

import { IFurniture } from "@/types";
import { connectToDatabase } from "../mongoose";
import { handleError } from "../utils";
import Wishlist from "../models/wishlist.models";
import Compare from "../models/compare.models";

export const addProductToCompare = async (
  userId: string,
  product: IFurniture
) => {
  try {
    await connectToDatabase();
    let compare = await Compare.findOne({ clerkId: userId });

    if (!compare) {
      compare = new Compare({
        clerkId: userId,
        compare: [product],
      });
      await compare.save();
    } else {
      const productExists = compare.compare.some(
        (item: IFurniture) => item._id.toString() === product._id.toString()
      );

      if (!productExists) {
        compare.compare.push(product);
        await compare.save();
      } else {
        console.log("Product already in compare");
      }
    }

    // Populate the wishlist with full product details
    const populatedCompare = await compare.populate("compare");

    // Return the fully populated wishlist
    return JSON.parse(JSON.stringify(populatedCompare));
  } catch (error) {
    handleError(error);
  }
};

export const getCompareById = async (userId: string) => {
  try {
    await connectToDatabase();
    const compare = await Compare.findOne({ clerkId: userId }).populate<{
      compare: IFurniture[];
    }>("compare");

    return compare ? JSON.parse(JSON.stringify(compare.compare)) : [];
  } catch (error) {
    handleError(error);
  }
};

export const removeProductInCompare = async (
  userId: string,
  product: IFurniture
) => {
  try {
    await connectToDatabase();
    const compare = await Wishlist.findOne({ clerkId: userId });

    if (compare) {
      compare.compare = compare.compare.filter(
        (item: IFurniture) => item._id.toString() !== product._id.toString()
      );
      await compare.save();
    }
    const newCompare = await compare.populate("compare");
    return JSON.parse(JSON.stringify(newCompare));
  } catch (error) {
    handleError(error);
  }
};
