import db from "@/lib/api-functions/server/db";
import Basket from "@/lib/api-functions/server/baskets/model";

export const add = async (data) => {
  const newBasket = new Basket(data);
  const result = await newBasket.save();
  return result;
};

export const getUserBasketQuery = async (sub, createIfNotFound=false) => {

  const results = await Basket.findOne({ owner: sub }).populate("items").exec();

  if (!results && createIfNotFound) {
    return await add({ owner: sub });
  }
  return results;
};

export const getBasketsQuery = async (query = {}) => {
  return await Basket.find(query).populate("items").exec();
};

export const getBasketQuery = async (id) => {
  return await Basket.findById(id).exec();
};

export const update = async (id, updates) => {
  return await Basket.updateOne({ _id: id }, updates);
};

export const updateByOwnerId = async (ownerId, updates) => {
  return await Basket.updateOne({ owner: ownerId }, updates);
};

export const empty = async (ownerId) => {
  return await Basket.updateOne({ owner: ownerId }, { items: []});
};

export const remove = async (id) => {
  return await Basket.deleteOne({ _id: id });
};