import { useQuery } from "react-query";
import { Product, productSchema } from "../schemas/product";
import { ensureTrailingSlash } from "../utils/url";

export const useGetProductsByIdQuery = (productId: string) => {
  return useQuery<Product | undefined>(
    ["getProductsById", productId],
    async () => {
      const response = await fetch(
        new URL(
          `./products/${productId}`,
          ensureTrailingSlash(import.meta.env["PUBLIC_API_PRODUCTS_SERVICE"])
        )
      );

      const { product } = await response.json();

      if (!product) return undefined;

      const validatedProduct = await productSchema.validate(product);

      return validatedProduct;
    }
  );
};
