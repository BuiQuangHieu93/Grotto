import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleError = (error: unknown) => {
  console.error(error);
  if (typeof error === "string") {
    throw new Error(error);
  } else if (error instanceof Error) {
    throw error;
  } else {
    throw new Error(JSON.stringify(error));
  }
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);
