import { useMutation } from "react-query";
import { Product } from "../schemas/product";

export const useAddToCartMutation = () => {
  return useMutation((product: Product) => {
    throw new Error("Not implemented");
  });
};
