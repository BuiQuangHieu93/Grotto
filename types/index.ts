import { Document } from "mongoose";

//Blog
export interface BlogDataProps {
  image: string;
  day: Date;
  location: string;
  title: string;
  detail: string;
}

export interface CreateBlogParams {
  image: string;
  day: Date;
  location: string;
  title: string;
  detail: string;
}

export interface GetBlogParams {
  _id: string;
  image: string;
  day: Date;
  location: string;
  title: string;
  detail: string;
}

export interface AddBlogModalProps {
  onSave: (newBlog: BlogDataProps) => void;
}

export interface BlogCardDeleteProps {
  blog: GetBlogParams;
  onDelete: (blogId: string) => void;
}

//User
export interface IUser extends Document {
  _id: string;
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
export interface IFurniture extends Document {
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
  category: "table and chair" | "ceramic art" | "lighting" | "sofa and chair";
}

export interface IFurnitureFrontend {
  images: string[];
  imageHover: string;
  title: string;
  originalPrice: number;
  salePrice?: number;
  bestSelling: number;
  date: Date;
  available: number;
  feature: boolean;
  type: "Home" | "Office" | "Kitchen";
  category: "table and chair" | "ceramic art" | "lighting" | "sofa and chair";
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
  category: string;
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
  category?: string;
}

export interface CategoryRelatedProps {
  category: "table and chair" | "ceramic art" | "lighting" | "sofa and chair";
  id: string;
}

export interface FurnitureData {
  data: IFurniture;
  type: "origin" | "horizon";
}

export interface AddProductModalProps {
  onSave: (newProduct: IFurnitureFrontend) => void;
}

export interface ProductCardProps {
  product: IFurniture;
  onDelete: (productId: string) => void;
  onUpdate: (updatedProduct: IFurniture) => void;
}

//Cart actions

export interface ICartItem {
  product: IFurniture["_id"];
  quantity: number;
}

export interface ICart extends Document {
  _id: string;
  userId: string;
  items: ICartItem[];
  totalPrice: number;
}

export interface CreateCartParams {
  userId: string;
  items: { product: string; quantity: number }[];
  totalPrice: number;
}

export interface AddItemsParams {
  userId: string;
  items: { product: IFurniture; quantity: number }[];
}

export interface UpdateCartParams {
  userId: string;
  items: { product: IFurniture; quantity: number }[];
}

export interface DeleteItemParams {
  userId: string;
  productId: string;
}

export interface CartItem {
  product: IFurniture;
  quantity: number;
}

//Order

export interface CreateOrderParams {
  stripeId: string;
  userId: string;
  items: {
    product: IFurniture;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  paymentMethod: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface GetOrderParams {
  _id: string;
  stripeId: string;
  userId: string;
  items: {
    product: IFurniture;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  paymentMethod: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderParams {
  userId: string;
  items: { product: IFurniture; quantity: number }[];
  totalPrice: number;
}

export interface UpdateOrderParams {
  userId: string;
  stripeId: string;
  status: string;
}

//Other
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
  link: string;
  type: string;
}

export interface ImageProps {
  src: string;
  alt: string;
}

export interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  priceGap: number;
  values: number[];
  onChange: (values: number[]) => void;
}
