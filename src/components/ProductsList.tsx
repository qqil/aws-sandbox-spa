import { Card } from "flowbite-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useAddToCartMutation } from "../hooks/useAddToCartMutation";
import { ProductSchema } from "../schemas/product";
import { formatPrice } from "../utils/format-price";

const ProductCard: FC<{ product: ProductSchema }> = ({ product }) => {
  const addToCartMutation = useAddToCartMutation();

  return (
    <Link to={`/products/${product.id}`}>
      <Card
        imgAlt={product.title}
        imgSrc={`https://picsum.photos/seed/${product.id}/200/200`}
      >
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {product.title}
        </h5>

        <div>
          <span>{product.description}</span>
        </div>
        <div>
          <span className="font-bold">In stock: </span>
          <span>{product.stocks}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {formatPrice(product.price)}
          </span>

          <button
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={(e) => {
              e.preventDefault();
              addToCartMutation.mutate(product);
            }}
          >
            Add to cart
          </button>
        </div>
      </Card>
    </Link>
  );
};

const ProductsList: FC<{
  products: ProductSchema[];
}> = ({ products }) => (
  <section className="flex flex-row flex-wrap gap-4 justify-center">
    {products.map((product) => (
      <div key={product.id} className="max-w-[300px] min-w-[300px]">
        <ProductCard product={product} />
      </div>
    ))}
  </section>
);

export default ProductsList;
