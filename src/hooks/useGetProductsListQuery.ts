import { useQuery } from "react-query";
import { Product, productArraySchema } from "../schemas/product";

export const useGetProductsListQuery = () => {
  return useQuery<Product[]>(["getProductsList"], async () => {
    const url = new URL(
      "products",
      import.meta.env["PUBLIC_API_PRODUCTS_SERVICE"]
    );

    const response = await fetch(url);
    const { products } = await response.json();

    const validatedProducts = await productArraySchema.validate(
      productArraySchema.cast(products)
    );

    return validatedProducts as Product[];
  });
};
