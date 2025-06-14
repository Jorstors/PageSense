import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, useRoutes } from "react-router";

import routes from "~react-pages";
import MainLayout from "./layouts/MainLayout";
import { Toaster } from "sonner";
import path from "path";
import Loading from "./components/loading/Loading";

function App() {
  const wrappedRoutes = [
    {
      element: <MainLayout />,
      children: routes,
    }
  ]

  return <Suspense fallback={<Loading />}>{useRoutes(wrappedRoutes)}</Suspense>;
}

console.log(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster />
      <App />
    </BrowserRouter>
  </StrictMode>
);
