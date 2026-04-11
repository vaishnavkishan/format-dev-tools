import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import JsonFormatter from "./pages/JsonFormatter";
import MarkdownPreview from "./pages/MarkdownPreview";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Box mb={"40px"}>
        <Routes>
          <Route path="/" element={<JsonFormatter />} />
          <Route path="/json-format" element={<JsonFormatter />} />
          <Route path="/markdown-preview" element={<MarkdownPreview />} />
          {/* Fallback to root */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
      <Footer />
    </BrowserRouter>
  );
}
