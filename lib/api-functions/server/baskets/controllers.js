import { addBasketSchema, updateBasketSchema } from "@/lib/validation/";
import {
  getBasketsQuery,
  getUserBasketQuery,
  add,
  update,
  remove,
  empty,
} from "@/lib/api-functions/server/baskets/queries";

import { log } from "@/lib/utils/formatters";

const getBaskets = async (req, res) => {
  const { owner } = req.params;

  const query = {};

  if (owner) {
    query.owner = owner;
  }

  try {
    let data = await getBasketsQuery(query);
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getOwnBasket = async (req, res) => {
  const owner = req?.user?.sub;

  try {
    let data = await getUserBasketQuery(owner, true);
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const addBasket = async (req, res) => {
  let basketData = { ...req.body };

  if (basketData.image === "") {
    delete basketData.image;
  }

  try {
    const result = await add(basketData);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const addToUserBasket = async (req, res) => {
  const { itemID } = req.body;
  console.log("user", req.user);

  const owner = req?.user?.sub;
  console.log("owner", owner);

  try {
    const basket = await getUserBasketQuery(owner);
    console.log("basket", basket);
    basket.items.push(itemID);
    const result = await basket.save();
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const updateBasket = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  if (!id) {
    return res.status(400).json({ message: "No id provided to update" });
  }

  let updates = { ...req.body };

  try {
    const result = await update(id, updates);
    if (result.n === 0) return res.status(404).end("Not Found");
    return res.status(200).json({ message: "Updated" });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const removeBasket = async (req, res) => {
  const { id } = req.params;
  console.log("🚀 ~ file: controllers.js:99 ~ removeBasket ~ id:", id);

  if (!id) {
    return res.status(400).json({ message: "No id provided to delete" });
  }

  try {
    const result = await remove(id);
    if (result.n === 0) return res.status(404).send({ message: "Not Found" });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const removeItemFromBasket = async (req, res) => {
  const { item } = req.params;
  console.log("🚀 ~ file: controllers.js:99 ~ removeBasket ~ item:", item);

  if (!item) {
    return res.status(400).json({ message: "No item provided to delete" });
  }

  const owner = req?.user?.sub;

  try {
    // All handler
    let result = {};
    if (item === "all") {
      result = await empty(owner);
    } else {
      const basket = await getUserBasketQuery(owner);
      console.log('b', basket);
      if (basket) {
        const idx = basket.items.findIndex((i) => i._id.toString() === item);
        console.log('idx', idx);
        if (idx !== -1) {
          basket.items = [
            ...basket.items.slice(0, idx),
            ...basket.items.slice(idx + 1),
          ];
          result = await basket.save();
        }
      }
    }

    if (result.n === 0) return res.status(404).end("Not Found");
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export {
  getBaskets,
  getOwnBasket,
  addBasket,
  addToUserBasket,
  updateBasket,
  removeBasket,
  removeItemFromBasket,
};