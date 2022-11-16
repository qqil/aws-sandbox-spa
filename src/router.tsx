import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import { ProvideAuthContext } from "./context/auth";
import CognitoLoginCallbackPage from "./pages/callback/CognitoLoginCallback";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import ProductPage from "./pages/Product";
import ProductCreatePage from "./pages/ProductCreate";
import ProductsImportPage from "./pages/ProductsImport";
import ProductsListPage from "./pages/ProductsList";

const Router: FC = () => (
  <BrowserRouter>
    <ProvideAuthContext>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsListPage />} />
          <Route path="products/:productId" element={<ProductPage />} />
          <Route path="products/create" element={<ProductCreatePage />} />
          <Route path="import" element={<ProductsImportPage />} />
        </Route>
        <Route path="auth">
          <Route path="login" element={<MainLayout />}>
            <Route index element={<LoginPage />} />
          </Route>
          <Route path="callback">
            <Route path="cognito" element={<CognitoLoginCallbackPage />} />
          </Route>
        </Route>
      </Routes>
    </ProvideAuthContext>
  </BrowserRouter>
);

export default Router;
