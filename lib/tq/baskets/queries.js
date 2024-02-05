
import { useQuery } from "@tanstack/react-query";
import { fetchBaskets, fetchUserBasket } from "./api";
import { USER_BASKET_STORAGE_KEY, STORAGE_KEY } from './settings';

export const useBaskets = ({
  onSuccess = () => {},
  onError = (err) => {
    console.log(err);
  },
} = {}) =>
  useQuery({
    suspense: true,
    queryKey: [STORAGE_KEY],
    queryFn: fetchBaskets,
    onSuccess,
    onError,
  });

  export const useUserBasket = ({
    onSuccess = () => {},
    onError = (err) => {
      console.log(err);
    },
  } = {}) =>
    useQuery({
      suspense: true,
      queryKey: [USER_BASKET_STORAGE_KEY],
      queryFn: fetchUserBasket,
      onSuccess,
      onError,
    });