/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from "react";
import { Snackbar, Alert, type AlertColor } from "@mui/material";

interface ToastOptions {
  message: string;
  type?: AlertColor; // 'success' | 'info' | 'warning' | 'error'
  duration?: number; // in ms
}

interface ToastContextType {
  showToast: (options: ToastOptions) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<ToastOptions>({
    message: "",
    type: "info",
    duration: 3000,
  });

  const showToast = ({
    message,
    type = "info",
    duration = 3000,
  }: ToastOptions) => {
    setToast({ message, type, duration });
    setOpen(true);
  };

  const hideToast = () => {
    setOpen(false);
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={toast.duration}
        onClose={hideToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={toast.type}
          onClose={hideToast}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
