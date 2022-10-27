import { useQuery } from "react-query";
import {
  productArraySchemaObject,
  ProductArraySchema,
} from "../schemas/product";
import { ensureTrailingSlash } from "../utils/url";

export const useGetProductsListQuery = () => {
  return useQuery<ProductArraySchema>(["getProductsList"], async () => {
    const url = new URL(
      "./products",
      ensureTrailingSlash(import.meta.env["PUBLIC_API_PRODUCTS_SERVICE"])
    );

    const response = await fetch(url);
    const { products } = await response.json();

    const validatedProducts = await productArraySchemaObject.validate(
      productArraySchemaObject.cast(products)
    );

    return validatedProducts;
  });
};
