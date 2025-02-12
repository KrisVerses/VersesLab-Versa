import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, RouterProvider } from "react-router-dom";
import router from "./app/routes/routes.tsx";
import "../src/styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
