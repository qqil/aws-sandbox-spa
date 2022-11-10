import { useMutation, useQueryClient } from "react-query";
import { CreateProduct } from "../schemas/create-product";
import { Product } from "../schemas/product";
import { ensureTrailingSlash } from "../utils/url";

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (product: CreateProduct): Promise<Product> => {
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
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getProductsList"]);
      },
    }
  );
};
