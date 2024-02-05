import db from "@/lib/api-functions/server/db";
import Order from "@/lib/api-functions/server/orders/model";

export const getOrdersQuery = async (query = {}) => {
  return await Order.find(query).exec();
};

export const getUserOrdersQuery = async (sub) => {
  return await Order.find({ owner: sub }).exec();
};

export const getOrderQuery = async (id) => {
  return await Order.findById(id).exec();
};

export const add = async (data) => {
  const newOrder = new Order(data);
  const result = await newOrder.save();
  return result;
};

export const update = async (id, updates) => {
  return await Order.updateOne({ _id: id }, updates);
};

export const remove = async (id) => {
  return await Order.deleteOne({ _id: id });
};