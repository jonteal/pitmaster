import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout.tsx";
import { PageRouter } from "./routes/PageRouter.tsx";
import "./index.css";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppLayout children={PageRouter()} />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
