import { useMutation, useQueryClient } from "react-query";
import { CreateProductSchema } from "../schemas/create-product";
import { ProductSchema } from "../schemas/product";
import { ensureTrailingSlash } from "../utils/url";

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (product: CreateProductSchema): Promise<ProductSchema> => {
      try {
        const response = await fetch(
          new URL(
            "./products",
            ensureTrailingSlash(import.meta.env["PUBLIC_API_PRODUCTS_SERVICE"])
          ),
          {
            method: "POST",
            body: JSON.stringify(product),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok)
          throw new Error(`${response.status} ${response.statusText}`);

        const { product: newProduct } = await response.json();

        return newProduct;
      } catch (e: any) {
        throw e.message;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getProductsList"]);
      },
    }
  );
};
