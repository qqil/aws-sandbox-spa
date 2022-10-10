import { Card, Spinner } from "flowbite-react";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { useAddToCartMutation } from "../hooks/useAddToCartMutation";
import { useGetProductsByIdQuery } from "../hooks/useGetProductsByIdQuery";
import { formatPrice } from "../utils/format-price";

const ProductPage: FC = (props) => {
  const { productId } = useParams();

  if (!productId) return <h1>`productId` is not defined</h1>;

  const {
    isLoading,
    data: product,
    isSuccess,
  } = useGetProductsByIdQuery(productId);
  const addToCartMutation = useAddToCartMutation();

  if (isSuccess && !product) return <h1>Product not found</h1>;

  return (
    <>
      <h1 className="text-xl text-center font-semibold tracking-tight text-gray-900 dark:text-white my-5">
        Product details
      </h1>

      <div className="flex justify-center">
        {isLoading && (
          <div>
            <Spinner />
          </div>
        )}
        <div className="max-w-[300px]">
          {product && (
            <Card
              imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
              imgSrc={`https://picsum.photos/seed/${product.id}/200/200`}
              title={product.title}
            >
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {product.title}
              </h5>

              <div>
                <span>{product.description}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {formatPrice(product.price.toString())}
                </span>
                <a
                  href="#"
                  className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={(e) => {
                    e.preventDefault();
                    addToCartMutation.mutate(product);
                  }}
                >
                  Add to cart
                </a>
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
