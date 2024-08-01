import { Schema, model, models } from "mongoose";

const FurnitureSchema = new Schema({
  images: { type: [String], required: true },
  imageHover: { type: String, required: true },
  title: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  salePrice: { type: Number, required: false },
  bestSelling: { type: Number, required: true },
  date: { type: Date, required: true },
  available: { type: Number, required: true },
  feature: { type: Boolean, required: true },
  type: { type: String, required: true },
});

const Furniture = models.Furniture || model("Furniture", FurnitureSchema);

export default Furniture;
