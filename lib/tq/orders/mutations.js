import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteOrder,
  updateOrder,
  addOrder,
  addToOrder,
  removeItemFromUserOrder,
} from "./api";
import { STORAGE_KEY, USER_ORDERS_STORAGE_KEY } from "./settings";

export const useUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [STORAGE_KEY] });
    },
  });
};

export const useDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [STORAGE_KEY] });
    },
  });
};

export const useRemoveFromOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeItemFromUserOrder,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [USER_ORDER_STORAGE_KEY] });
    },
  });
};