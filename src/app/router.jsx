import { createBrowserRouter, Navigate } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import UiComponentsPage from "../pages/UiComponentsPage";
import CommonComponentsPage from "../pages/CommonComponentsPage";

export const router = createBrowserRouter([
  {
    path: "/home",
    element: <HomePage />,
    errorElement: <ErrorPage />, // handles unmatched children routes inside /home
    children: [
      {
        index: true, // default content for /home
        element: (
          <div className="p-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Home Page</h2>
            <p className="mt-2 text-gray-600">Welcome to the home page!</p>
          </div>
        ),
      },
      {
        path: "ui", // /home/ui
        element: <UiComponentsPage />,
      },
      {
        path: "common", // /home/common
        element: <CommonComponentsPage />,
      },
    ],
  },
  {
    path: "/", // redirect root to /home
    element: <Navigate to="/home" replace />,
  },
  {
    path: "*", // catch-all route for unknown URLs
    element: <ErrorPage />,
  },
]);
