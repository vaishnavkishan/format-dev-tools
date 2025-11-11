import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./brand.ts";
import { CssBaseline } from "@mui/material";
import Loader from "./components/Loader.tsx";
import { ToastProvider } from "./contexts/ToastContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastProvider>
        <Suspense fallback={<Loader />}>
          <App />
        </Suspense>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>
);
