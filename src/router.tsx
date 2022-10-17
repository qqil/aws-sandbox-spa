import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/Home";
import ProductPage from "./pages/Product";
import ProductsListPage from "./pages/ProductsList";

const Router: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsListPage />} />
        <Route path="products/:productId" element={<ProductPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
