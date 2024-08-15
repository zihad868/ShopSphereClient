import * as ReactDOM from "react-dom/client";

import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import ErrorElement from "../Components/ErrorElement";
import Signin from "../Pages/Authentication/Signin";
import Signup from "../Pages/Authentication/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: '/signup',
        element: <Signup />
      }
    ],
  },
]);

export default router;
