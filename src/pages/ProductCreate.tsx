import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductCreateForm } from "../components/ProductCreateForm";
import { useAuth } from "../hooks/useAuth";

const ProductCreatePage: FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/auth/login");
  }, [user]);

  return (
    <>
      <h1 className="text-xl text-center font-semibold tracking-tight text-gray-900 dark:text-white my-5">
        Create product
      </h1>

      <div className="flex justify-center">
        <div className="basis-80">
          <ProductCreateForm />
        </div>
      </div>
    </>
  );
};

export default ProductCreatePage;
