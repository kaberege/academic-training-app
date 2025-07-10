import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, Navigate } from "react-router";
import LessonPage from "./pages/LessonPage";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/lesson/0" replace />,
  },
  {
    path: "/lesson/:sectionIndex",
    element: <LessonPage />,
  },
  {
    path: "*",
    element: <Navigate to="/lesson/0" replace />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
