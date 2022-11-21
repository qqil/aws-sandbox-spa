import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { useAuth } from "../hooks/useAuth";

const LoginPage: FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <h1 className="text-xl text-center font-semibold tracking-tight text-gray-900 dark:text-white my-5">
        Login
      </h1>

      <div className="flex justify-center">
        {/* <div className="basis-80"> */}
        <LoginForm />
        {/* </div> */}
      </div>
    </>
  );
};

export default LoginPage;
