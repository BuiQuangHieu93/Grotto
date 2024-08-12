"use server";

import { handleError } from "@/lib/utils";
import { connectToDatabase } from "../mongoose";
import Blog from "../models/blog.models";
import { CreateBlogParams } from "@/types";
import { utapi } from "../uploadthing";

export async function createBlog(blog: CreateBlogParams) {
  try {
    await connectToDatabase(); // Ensure database connection is established
    const newBlog = await Blog.create(blog);
    return JSON.parse(JSON.stringify(newBlog));
  } catch (error) {
    console.error("Error creating blog:", error);
    handleError(error);
  }
}

export async function getAllBlog() {
  try {
    await connectToDatabase(); // Ensure database connection is established
    const allBlogs = await Blog.find({});
    return JSON.parse(JSON.stringify(allBlogs));
  } catch (error) {
    handleError(error);
  }
}

// lib/actions/blog.actions.ts
export async function DeleteBlogById(blogId: string): Promise<boolean> {
  try {
    connectToDatabase();

    const deleteToBlog = await Blog.findOne({ _id: blogId });

    if (!deleteToBlog) {
      throw new Error("Blog not found");
    }

    await Blog.findByIdAndDelete(deleteToBlog._id);
    await utapi.deleteFiles(deleteToBlog.image);
    return true; // Successfully deleted
  } catch (error) {
    handleError(error);
    return false; // Failed to delete
  }
}

export async function GetBlogById(BlogId: string) {
  try {
    await connectToDatabase();
    const blog = await Blog.findById(BlogId);
    return JSON.parse(JSON.stringify(blog));
  } catch (error) {
    handleError(error);
  }
}
