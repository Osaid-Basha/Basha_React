import { createBrowserRouter } from "react-router";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Cart from "./pages/cart/Cart";
import ForgotPasswor from "./pages/forgot password/ForgotPasswor";
import ResetPassword from "./pages/reset password/ResetPassword";
import Products from "./pages/products/Products";
import Product from "./pages/product/Product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {
        index: true,
        element: <Home/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/cart",
    element: <Cart/>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswor/>,
  },
  
  {
    path: "/reset-password",
    element: <ResetPassword/>,
  }
  ,
  {
    path: "/products",
    element: <Products/>,
  }
  ,
  {
    path: "/product/:id",
    element: <Product/>,
  }
  ],},
]);
export default router;
