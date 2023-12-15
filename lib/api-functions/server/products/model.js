// ! JSON Schema for inputting into DB
// {
//   "title": "MLD Duomid",
//   "description": "Pyramid Tarp",
//   "price": 400,
//   "quantity": 1,
//   "favourites": 0,
//   "image": "https://bikepacking.com/wp-content/uploads/2023/09/Mountain-Laurel-DuoMid-XL-Review_25.jpg"
// }

import mongoose from "mongoose";
import db from "@/lib/api-functions/server/db";
const { Schema } = mongoose;

export const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  favourites: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: "https://static.thenounproject.com/png/3454588-200.png",
  },
});

const Product = mongoose?.models?.Product || mongoose.model("Product", productSchema);
export default Product;