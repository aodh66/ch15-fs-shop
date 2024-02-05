/*
  {
    image: url,
    title: string,
    description?: string,
    price: number,
    quantity: number
  }
*/

import mongoose from "mongoose";
import "../products/model";
const { Schema } = mongoose;

export const orderSchema = new Schema({
  owner: {
    type: String, // Auth0 ID
    required: true,
  },
  items: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  receiptURL: {
    type: String,  // Stripe receipt url
    required: true,
  },
});

const Order = mongoose?.models?.Order || mongoose.model("Order", orderSchema);
export default Order;