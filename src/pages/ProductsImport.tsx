import { FC } from "react";
import ProductsImportForm from "../components/ProductsImportForm";

const ProductsImportPage: FC = () => {
  return (
    <>
      <h1 className="text-xl text-center font-semibold tracking-tight text-gray-900 dark:text-white my-5">
        Import products
      </h1>

      <div className="flex justify-center">
        <div className="basis-80">
          <ProductsImportForm />
        </div>
      </div>
    </>
  );
};

export default ProductsImportPage;
