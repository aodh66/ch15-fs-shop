import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteBasket,
  updateBasket,
  addBasket,
  addToBasket,
  removeItemFromUserBasket,
} from "./api";
import { STORAGE_KEY, USER_BASKET_STORAGE_KEY } from "./settings";

export const useAdd = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addBasket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STORAGE_KEY] });
    },
  });
};

export const useAddToBasket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addToBasket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_BASKET_STORAGE_KEY] });
    },
  });
};

export const useUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBasket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STORAGE_KEY] });
    },
  });
};

export const useDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBasket,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [STORAGE_KEY] });
    },
  });
};

export const useRemoveFromBasket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeItemFromUserBasket,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [USER_BASKET_STORAGE_KEY] });
    },
  });
};