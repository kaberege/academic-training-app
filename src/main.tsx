import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router";
import LessonPage from "./components/lesson/LessonPage";
import ErrorPage from "./components/ErrorPage";
import App from "./App";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Navigate to="/lesson/0" replace />,
      },
      {
        path: "/lesson/:sectionIndex",
        element: <LessonPage />,
      },
    ],
  },

  {
    path: "*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
