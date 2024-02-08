
import { useQuery } from "@tanstack/react-query";
import { fetchOrders, fetchUserOrder } from "./api";
import { USER_ORDER_STORAGE_KEY, STORAGE_KEY } from './settings';

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

  export const useUserOrder = ({
    onSuccess = () => {},
    onError = (err) => {
      console.log(err);
    },
  } = {}) =>
    useQuery({
      suspense: true,
      queryKey: [USER_ORDER_STORAGE_KEY],
      queryFn: fetchUserOrder,
      onSuccess,
      onError,
    });