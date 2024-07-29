"use server";

import { revalidatePath } from "next/cache";

import { handleError } from "@/lib/utils";
import { connectToDatabase } from "../mongoose";
import User from "../models/user.models";
import { clerkClient } from "@clerk/nextjs/server";

interface CreateUserParams {
  clerkId: string;
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  photo: string;
  isAdmin: boolean;
}

export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export async function CheckUserRoleById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ userId: userId });
    const role = user.isAdmin;

    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(role));
  } catch (error) {
    handleError(error);
  }
}

interface UpdateUserParams {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    await clerkClient.users.deleteUser(clerkId);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

export async function getAllUsers() {
  try {
    await connectToDatabase();
    const users = await User.find({});
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    handleError(error);
  }
}
