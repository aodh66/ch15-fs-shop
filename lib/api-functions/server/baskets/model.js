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
import "../products/model";
const { Schema } = mongoose;

export const basketSchema = new Schema({
  owner: {
    type: String, // Auth0 ID
    required: true,
    unique: true,
  },
  items: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

const Basket = mongoose?.models?.Basket || mongoose.model("Basket", basketSchema);
export default Basket;