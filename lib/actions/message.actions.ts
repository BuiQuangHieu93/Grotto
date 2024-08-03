"use server";

import { CreateMessage } from "@/types";
import Message from "../models/message.models";
import { connectToDatabase } from "../mongoose";
import { handleError } from "../utils";

export async function createMessage(message: CreateMessage) {
  try {
    await connectToDatabase();
    const newMessage = await Message.create(message);
    return JSON.parse(JSON.stringify(newMessage));
  } catch (error) {
    handleError(error);
  }
}

export async function getAllMessage() {
  try {
    await connectToDatabase();
    const messageItems = await Message.find({});
    return JSON.parse(JSON.stringify(messageItems));
  } catch (error) {
    handleError(error);
  }
}
