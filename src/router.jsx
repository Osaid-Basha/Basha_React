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
import ProtectedRouter from "./components/Protected/ProtectedRouter";
import Checkout from "./pages/checkout/Checkout";
import Profile from "./pages/profile/Profile";
import Contact from "./pages/contact/Contact";
import About from "./pages/about/About";

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
        element: (
          <ProtectedRouter>
            <Cart/>
          </ProtectedRouter>
        ),
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRouter>
            <Checkout/>
          </ProtectedRouter>
        ),
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswor/>,
      },
      {
        path: "/reset-password",
        element: <ResetPassword/>,
      },
      {
        path: "/products",
        element: <Products/>,
      },
      {
        path: "/product/:id",
        element: <Product/>,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRouter>
            <Profile/>
          </ProtectedRouter>
        ),
      },
      {
        path: "/contact",
        element: <Contact/>,
      },
      {
        path: "/about",
        element: <About/>,
      }
    ],
  },
]);
export default router;
