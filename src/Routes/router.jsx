import * as ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
} from "react-router-dom";
import Layout from "../Layout/Layout";
import ErrorElement from "../Components/ErrorElement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorElement />
  },
]);


export default router;