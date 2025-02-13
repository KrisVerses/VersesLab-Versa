import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes/routes.tsx";
import "./styles/index.css";
import { StateProvider } from "./app/StateProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StateProvider>
    <RouterProvider router={router} />
  </StateProvider>
);
