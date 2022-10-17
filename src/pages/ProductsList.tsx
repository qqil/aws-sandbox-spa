import { Spinner } from "flowbite-react";
import { FC } from "react";
import ProductsList from "../components/ProductsList";
import { useGetProductsListQuery } from "../hooks/useGetProductsListQuery";

const ProductsListPage: FC = () => {
  const { isLoading, data } = useGetProductsListQuery();

  return (
    <>
      <h1 className="text-xl text-center font-semibold tracking-tight text-gray-900 dark:text-white my-5">
        Products
      </h1>
      <div>
        {isLoading && (
          <div>
            <Spinner />
          </div>
        )}
        <div>{data && <ProductsList products={data} />}</div>
      </div>
    </>
  );
};

export default ProductsListPage;
