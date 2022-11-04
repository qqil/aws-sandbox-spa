import { useQuery } from "react-query";
import { productSchema, Product } from "../schemas/product";
import { ensureTrailingSlash } from "../utils/url";

export const useGetProductsListQuery = () => {
  return useQuery<Product[]>(["getProductsList"], async () => {
    const url = new URL(
      "./products",
      ensureTrailingSlash(import.meta.env["PUBLIC_API_PRODUCTS_SERVICE"])
    );

    const response = await fetch(url);
    const { products } = await response.json();

    const validatedProducts = await Promise.all(
      products.map((product: any) => productSchema.validate(product))
    );

    return validatedProducts;
  });
};
