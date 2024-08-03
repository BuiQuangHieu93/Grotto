import mongoose from "mongoose";

//Other
export interface BlogDataProps {
  id: number;
  image: string;
  day: string;
  location: string;
  title: string;
  detail: string;
}

export interface Slide {
  id: number;
  title: string;
  tagline?: string;
  image: string;
  count?: number;
}

export interface DemoSliderProps {
  data: Slide[];
}

export interface CardProps {
  image: string;
  title: string;
}

export interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  priceGap: number;
  values: number[];
  onChange: (values: number[]) => void;
}

//User
export interface User {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
  isAdmin: boolean;
}

export interface CreateUserParams {
  clerkId: string;
  firstName: string | null;
  lastName: string | null;
  username: string;
  email: string;
  photo: string;
  isAdmin: boolean;
}

export interface UpdateUserParams {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
}

//Message
export interface GetMessage {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface CreateMessage {
  name: string;
  email: string;
  phone: string;
  message: string;
}

//Furniture
export interface Furniture {
  images: string[];
  imageHover: string;
  title: string;
  originalPrice: number;
  salePrice?: number;
  bestSelling: number;
  date: Date;
  available: number;
  feature: boolean;
  type: string;
}

export interface GetFurniture {
  _id: string;
  images: string[];
  imageHover: string;
  title: string;
  originalPrice: number;
  salePrice?: number;
  bestSelling: number;
  date: Date;
  available: number;
  feature: boolean;
  type: string;
}

export interface CreateFurnitureParams {
  images: string[];
  imageHover: string;
  title: string;
  originalPrice: number;
  salePrice?: number;
  bestSelling: number;
  date: Date;
  available: number;
  feature: boolean;
  type: string;
}

export interface UpdateFurnitureParams {
  images?: string[];
  imageHover?: string;
  title?: string;
  originalPrice?: number;
  salePrice?: number;
  bestSelling?: number;
  date?: Date;
  available?: number;
  feature?: boolean;
  type?: string;
}

export interface FurnitureData {
  data: GetFurniture;
  type: "origin" | "horizon";
}

export interface AddProductModalProps {
  onSave: (newProduct: Furniture) => void;
}

//Cart actions

export interface AddItemsParams {
  userId: mongoose.Types.ObjectId;
  items: { product: mongoose.Types.ObjectId; quantity: number }[];
}

export interface UpdateCartParams {
  userId: mongoose.Types.ObjectId;
  items: { product: mongoose.Types.ObjectId; quantity: number }[];
  totalPrice: number;
}

export interface DeleteItemParams {
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
}

export interface CartItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
}
