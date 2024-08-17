import * as ReactDOM from "react-dom/client";

import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import ErrorElement from "../Components/ErrorElement";
import Signin from "../Pages/Authentication/Signin";
import Signup from "../Pages/Authentication/Signup";
import Home from "../Pages/Home/Home";
import AddProducts from "../Pages/Products/AddProducts";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/addProduct",
        element: (
          <PrivateRoutes>
            <AddProducts />
          </PrivateRoutes>
        ),
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

export default router;
