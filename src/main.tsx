import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { CookiesProvider } from "react-cookie";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error: any) => {
        if (error.response?.status === 401) return false;
        if (error.response?.status === 404) return false;
        if (error.response?.status === 400) return false;
        if (error.response?.status === 403) return false;
        if (error.response?.status === 409) return false;
        return failureCount < 3;
      },
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>,
);
