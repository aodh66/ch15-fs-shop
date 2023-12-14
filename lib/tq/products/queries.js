
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchProduct } from "./api";
import { STORAGE_KEY } from "./settings";

export const useProducts = ({
  onSuccess = () => {},
  onError = (err) => {
    console.log(err);
  },
} = {}) =>
  useQuery({
    suspense: true,
    queryKey: [STORAGE_KEY],
    queryFn: fetchProducts,
    onSuccess,
    onError,
  });