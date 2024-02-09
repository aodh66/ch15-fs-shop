import axios from "axios";

export const ORDERS_ENDPOINT = `/api/v1/orders/`;

// User functions
export const fetchUserOrder = async () => {
  const { data } = await axios(`${ORDERS_ENDPOINT}own`);
  // console.log("fetchUserOrder data", data);
  return data;
};

export const fetchOrders = async () => {
  const {data} = await axios(ORDERS_ENDPOINT);
  console.log(data);
  // await new Promise((r) => setTimeout(r, 1000)); // simulate server delay
  return data;
};

export const addOrder = async (data) => {
  console.log("about to add", data);
  const response = await axios({
    method: "POST",
    url: ORDERS_ENDPOINT,
    data,
  });
  return response.data;
};

export const updateOrder = async ({ _id, ...data }) => {
  const response = await axios({
    url: `${ORDERS_ENDPOINT}${_id}`,
    method: "PUT",
    data,
  });
  return response.data;
};

export const deleteOrder = async (id) => {
  return await axios({
    method: "DELETE",
    url: `${ORDERS_ENDPOINT}${id}`,
  });
};