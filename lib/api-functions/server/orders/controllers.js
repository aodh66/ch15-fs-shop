import {
  getOrderQuery,
  getOrdersQuery,
  getUserOrdersQuery,
  // add,
  // update,
  // remove,
} from "@/lib/api-functions/server/orders/queries";

const getOrders = async (req, res) => {
  const { owner } = req.params;
  console.log("🚀 ~ file: controllers.js:9 ~ getOrders ~ owner:", owner);

  try {
    let data = [];
    if (owner) {
      data = await getOrderQuery(owner);
    } else {
      data = await getOrdersQuery();
    }
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getOwnOrders = async (req, res) => {
  const { owner } = req.params;
  console.log("🚀 ~ file: controllers.js:9 ~ getOrders ~ owner:", owner);

  try {
    const data = await getUserOrdersQuery(req.user.sub);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const addOrder = async (req, res) => {
  let orderData = { ...req.body };

  if (orderData.image === "") {
    delete orderData.image;
  }
  console.info(orderData);

  try {
    orderData = await addOrderSchema.validate(orderData);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }

  try {
    const result = await add(orderData);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const updateOrder = async (req, res, isAdmin) => {
  const { id } = req.params;
  console.log(id);

  if (!id) {
    return res.status(400).json({ message: "No id provided to update" });
  }

  let updates = { ...req.body };

  try {
    updates = await updateOrderSchema.validate(updates);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }

  try {
    const result = await update(id, updates);
    if (result.n === 0) return res.status(404).send({ message: "Not Found" });
    return res.status(200).send({ message: "Updated" });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const removeOrder = async (req, res) => {
  const { id } = req.params;
  console.log("🚀 ~ file: controllers.js:99 ~ removeOrder ~ id:", id);

  if (!id) {
    return res.status(400).json({ message: "No id provided to delete" });
  }

  const query = {
    _id: id,
  };

  // if (!isAdmin) {
  //   query.owner = req.user.sub;
  // }

  try {
    const result = await remove(id);
    if (result.n === 0) return res.status(404).send({ message: "Not Found" });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export { getOrders, getOwnOrders, addOrder, updateOrder, removeOrder };