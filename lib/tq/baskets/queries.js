
import { useQuery } from "@tanstack/react-query";
import { fetchBaskets, fetchBasket } from "./api";
import { STORAGE_KEY } from "./settings";

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