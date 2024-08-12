"use server";

import { connectToDatabase } from "../mongoose";
import { handleError } from "../utils";
import Furniture from "../models/product.models";
import { CreateFurnitureParams, UpdateFurnitureParams } from "@/types";
import { utapi } from "../uploadthing";

export async function createFurniture(furniture: CreateFurnitureParams) {
  try {
    await connectToDatabase();
    console.log("create furniture");
    const newFurniture = await Furniture.create(furniture);
    return JSON.parse(JSON.stringify(newFurniture));
  } catch (error) {
    handleError(error);
  }
}

export async function updateFurniture(
  id: string,
  updates: UpdateFurnitureParams
) {
  try {
    await connectToDatabase();
    const updatedFurniture = await Furniture.findByIdAndUpdate(id, updates, {
      new: true,
    });
    return JSON.parse(JSON.stringify(updatedFurniture));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteFurniture(id: string) {
  try {
    await connectToDatabase();
    await Furniture.findByIdAndDelete(id);
    const imageUrl = await Furniture.findById(id);
    const listUrl = imageUrl.images;
    const hoverImage = imageUrl.imageHover;
    await utapi.deleteFiles(listUrl);
    await utapi.deleteFiles(hoverImage);
    return { message: "Furniture item deleted successfully" };
  } catch (error) {
    handleError(error);
  }
}

// Define the getAllFurniture function
export async function getAllFurniture() {
  try {
    await connectToDatabase();
    const furnitureItems = await Furniture.find({});
    return JSON.parse(JSON.stringify(furnitureItems));
  } catch (error) {
    handleError(error);
  }
}

// Define the getFurnitureById function
export async function getFurnitureById(id: string) {
  try {
    await connectToDatabase();
    const furnitureItem = await Furniture.findById(id);
    if (!furnitureItem) {
      throw new Error("Furniture item not found");
    }
    return JSON.parse(JSON.stringify(furnitureItem));
  } catch (error) {
    handleError(error);
  }
}
