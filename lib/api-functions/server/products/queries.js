import db from "@/lib/api-functions/server/db";
import Product from "@/lib/api-functions/server/products/model";

export const fetchProducts = async (query = {}) => {
  return await Product.find(query).exec();
};

export const fetchProduct = async (id) => {
  return await Product.findById(id).exec();
};

export const add = async (data) => {
  const newProduct = new Product(data);
  const result = await newProduct.save();
  return result;
};

export const update = async (id, updates) => {
  return await Product.updateOne({ _id: id }, updates);
};

export const remove = async (id) => {
  return await Product.deleteOne({ _id: id });
};