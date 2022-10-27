import { useQuery } from "react-query";
import { ProductSchema, productSchemaObject } from "../schemas/product";
import { ensureTrailingSlash } from "../utils/url";

export const useGetProductsByIdQuery = (productId: string) => {
  return useQuery<ProductSchema | undefined>(
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

      const validatedProduct = await productSchemaObject.validate(
        productSchemaObject.cast(product)
      );

      return validatedProduct;
    }
  );
};
