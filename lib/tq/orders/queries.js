
import { useQuery } from "@tanstack/react-query";
import { fetchOrders, fetchOrder } from "./api";
import { STORAGE_KEY } from "./settings";

export const useOrders = ({
  onSuccess = () => {},
  onError = (err) => {
    console.log(err);
  },
} = {}) =>
  useQuery({
    suspense: true,
    queryKey: [STORAGE_KEY],
    queryFn: fetchOrders,
    onSuccess,
    onError,
  });