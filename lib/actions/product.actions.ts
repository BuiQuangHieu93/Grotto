"use server";

import { connectToDatabase } from "../mongoose";
import { handleError } from "../utils";
import Furniture from "../models/product.models";
import { CreateFurnitureParams, UpdateFurnitureParams } from "@/types";
import { UTApi } from "uploadthing/server";
const utapi = new UTApi();

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

    // Retrieve the item first
    const imageUrl = await Furniture.findById(id);
    if (!imageUrl) {
      return { message: "Furniture item not found" };
    }

    const listUrl = imageUrl.images;
    const hoverImage = imageUrl.imageHover;

    // Delete the furniture item from the database
    await Furniture.findByIdAndDelete(id);

    // Delete associated images
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

export async function GetFurnitureByCategory(category: string) {
  try {
    await connectToDatabase();
    const furnitureItems = await Furniture.find({ category: category });
    return JSON.parse(JSON.stringify(furnitureItems));
  } catch (error) {
    handleError(error);
    return []; // Optional: Return an empty array in case of error
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
