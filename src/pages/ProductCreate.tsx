import { FC } from "react";
import { ProductCreateForm } from "../components/ProductCreateForm";

const ProductCreatePage: FC = () => {
  return (
    <>
      <h1 className="text-xl text-center font-semibold tracking-tight text-gray-900 dark:text-white my-5">
        Create product
      </h1>

      <div className="flex justify-center">
        <div className="basis-1/4">
          <ProductCreateForm />
        </div>
      </div>
    </>
  );
};

export default ProductCreatePage;
