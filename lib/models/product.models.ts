const mongoose = require("mongoose");

const furnitureSchema = new mongoose.Schema({
  id: { type: String, required: true },
  images: { type: [String], required: true },
  imageHover: { type: String, required: true },
  title: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  salePrice: { type: Number, required: true },
  bestSelling: { type: Number, required: true },
  date: { type: String, required: true },
  available: { type: Number, required: true },
  feature: { type: Boolean, required: true },
  type: { type: String, required: true },
});

const Furniture = mongoose.model("Furniture", furnitureSchema);

module.exports = Furniture;
