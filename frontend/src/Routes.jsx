import { createBrowserRouter } from "react-router-dom";
import SharedLayout from "./pages/SharedLayout";
import HomePage from "./pages/HomePage";
import InnerPage from "./pages/InnerPage";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import SignUpPage from "./pages/SignUpPage";

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
        path: "/signup",
        element: <SignUpPage />,
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
