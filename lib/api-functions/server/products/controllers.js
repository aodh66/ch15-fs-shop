import { addProductSchema, updateProductSchema } from "@/lib/validation/";
import {
  fetchProduct,
  fetchProducts,
  add,
  update,
  remove,
} from "@/lib/api-functions/server/products/queries";

const getProducts = async (req, res) => {
  const { id } = req.params;
  // console.log("🚀 ~ file: controllers.js:9 ~ getProducts ~ id:", id);

  try {
    let data = [];
    if (id) {
      data = await fetchProduct(id);
    } else {
      data = await fetchProducts();
    }
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const addProduct = async (req, res, isAdmin) => {
  let productData = { ...req.body };

  if (productData.image === "") {
    delete productData.image;
  }
  console.info(productData);

  try {
    productData = await addProductSchema.validate(productData);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }

  try {
    const result = await add(productData);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const updateProduct = async (req, res, isAdmin) => {
  const { id } = req.params;
  console.log(id);

  if (!id) {
    return res.status(400).json({ message: "No id provided to update" });
  }

  let updates = { ...req.body };

  try {
    updates = await updateProductSchema.validate(updates);
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

const removeProduct = async (req, res) => {
  const { id } = req.params;
  console.log("🚀 ~ file: controllers.js:99 ~ removeProduct ~ id:", id);

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

export { getProducts, addProduct, updateProduct, removeProduct };