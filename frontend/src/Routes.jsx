import { createBrowserRouter } from "react-router-dom";
import SharedLayout from "./pages/SharedLayout";
import HomePage from "./pages/HomePage";
import InnerPage from "./pages/InnerPage";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import axios from "axios";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/:jobId",
        element: <InnerPage />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
