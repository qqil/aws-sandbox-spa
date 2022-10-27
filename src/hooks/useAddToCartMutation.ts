import { useMutation } from "react-query";
import { ProductSchema } from "../schemas/product";

export const useAddToCartMutation = () => {
  return useMutation((product: ProductSchema) => {
    throw new Error("Not implemented");
  });
};
