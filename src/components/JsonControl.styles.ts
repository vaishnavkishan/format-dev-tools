import { styled } from "@mui/material/styles";
import { Box, IconButton } from "@mui/material";

// Wrapper around textarea
export const JsonTextareaWrapper = styled(Box)(() => ({
  position: "relative",
  flex: 1,
  margin: 8,
  overflow: "hidden", // clip inner scroll
  display: "flex",
  flexDirection: "column",
  borderRadius: 15,
}));

export const JsonTextArea = styled("textarea")(({ theme }) => ({
  minHeight: "400px",
  maxHeight: "80vh",
  width: "100%",
  resize: "vertical",
  overflow: "auto",
  borderRadius: 15,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  boxSizing: "border-box", // ✅ ensures border is counted in total width/height
  appearance: "none", // ✅ removes default OS styles
  outline: "none", // ✅ remove blue highlight
  border: `2px solid ${theme.palette.divider}`, // ✅ normal border

  backgroundColor: theme.palette.mode === "dark" ? "#1E1E1E" : "#F3F6F9",
  color: theme.palette.text.primary,
  fontFamily: "'Fira Code', monospace",
  fontSize: 16,
  padding: "16px",
  transition: "all 0.25s ease",

  "&:focus": {
    backgroundColor: theme.palette.mode === "dark" ? "#2B2B2B" : "#EAF4FF",
  },

  "&::placeholder": {
    color: theme.palette.text.secondary,
    opacity: 0.7,
  },
}));

export const JsonOutputArea = styled(Box)(({ theme }) => ({
  width: "100%",
  borderRadius: 15,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  border: `2px solid`,
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.mode === "dark" ? "#1E1E1E" : "#F3F6F9",
  color: theme.palette.text.primary,
  fontFamily: "'Fira Code', monospace",
  fontSize: 16,
  padding: "16px",
  lineHeight: "1.5",
  whiteSpace: "pre-wrap",
  wordWrap: "break-word",
  overflow: "auto",
  "&:focus": {
    outline: "none",
    boxShadow: `#1976d2 0 0 0 2px`,
  },
}));

// Buttons inside textarea
export const ActionButtons = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 12,
  right: 12,
  display: "flex",
  gap: theme.spacing(1),
}));

// Toolbar below textarea
export const ToolBar = styled(Box)(({ theme }) => ({
  width: "100%",
  borderWidth: "0 2px 2px 2px",
  borderStyle: "solid",
  borderRadius: 15,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderColor: theme.palette.divider,
  display: "flex",
  justifyContent: "flex-start",
  padding: theme.spacing(1),
  gap: 8,
}));

export const CustomIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "rgba(255,255,255,0.1)",
  color: theme.palette.text.secondary,
  "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
}));
