import axios from "axios";

// const {
//   HOST='http://localhost:3000'
// } = process.env;
// console.log('HOST', HOST, process.env.HOST);
export const PRODUCTS_ENDPOINT = `/api/v1/products/`;

export const fetchProducts = async () => {
  const {data} = await axios(PRODUCTS_ENDPOINT);
  console.log(data);
  // await new Promise((r) => setTimeout(r, 1000)); // simulate server delay
  return data;
};

export const addProduct = async (data) => {
  console.log("about to add", data);
  const response = await axios({
    method: "POST",
    url: PRODUCTS_ENDPOINT,
    data,
  });
  return response.data;
};

export const updateProduct = async ({ _id, ...data }) => {
  const response = await axios({
    url: `${PRODUCTS_ENDPOINT}${_id}`,
    method: "PUT",
    data,
  });
  return response.data;
};

export const deleteProduct = async (id) => {
  return await axios({
    method: "DELETE",
    url: `${PRODUCTS_ENDPOINT}${id}`,
  });
};