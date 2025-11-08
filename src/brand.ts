// src/theme/brandTheme.ts
import { createTheme, type ThemeOptions } from "@mui/material";

const themeOptions: ThemeOptions = {
  colorSchemes: {
    dark: true,
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#13ecec",
      light: "#5ffbfb",
      dark: "#0da3a3",
      contrastText: "#0d0d0d",
    },
    secondary: {
      main: "#ff6b81",
      light: "#ff9aa8",
      dark: "#c73c50",
      contrastText: "#ffffff",
    },
    error: { main: "#ff5252" },
    warning: { main: "#ffb74d" },
    info: { main: "#29b6f6" },
    success: { main: "#00e676" },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#e0e0e0",
      secondary: "#b0b0b0",
      disabled: "rgba(255,255,255,0.5)",
    },
    divider: "rgba(255,255,255,0.12)",
  },
  typography: {
    fontFamily: "'Hanken Grotesk', 'Roboto', sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: 48,
      color: "#13ecec",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
    h2: {
      fontWeight: 600,
      fontSize: 36,
      color: "#e0e0e0",
    },
    h3: {
      fontWeight: 600,
      fontSize: 28,
      color: "#e0e0e0",
    },
    h4: {
      fontWeight: 500,
      fontSize: 22,
    },
    h5: {
      fontWeight: 500,
      fontSize: 18,
    },
    h6: {
      fontWeight: 400,
      fontSize: 16,
    },
    body1: {
      fontWeight: 400,
      fontSize: 16,
      lineHeight: 1.6,
    },
    body2: {
      fontWeight: 400,
      fontSize: 14,
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 600,
      fontSize: 14,
      textTransform: "none",
    },
    caption: {
      fontWeight: 400,
      fontSize: 12,
      color: "#9e9e9e",
    },
    overline: {
      fontWeight: 600,
      fontSize: 10,
      letterSpacing: "1px",
      textTransform: "uppercase",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "6px 16px",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "#0da3a3",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundImage: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#1E1E1E",
            "& fieldset": {
              borderColor: "rgba(255,255,255,0.1)",
            },
            "&:hover fieldset": {
              borderColor: "#13ecec",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#13ecec",
            },
          },
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);
