import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, useRoutes } from "react-router";

import routes from "~react-pages";
import { Toaster } from "sonner";

function App() {
  return <Suspense>{useRoutes(routes)}</Suspense>;
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
