import "./App.css";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import JsonFormatter from "./pages/JsonFormatter";
import MarkdownPreview from "./pages/MarkdownPreview";

export default function App() {
  const [smallTitle, setSmallTitle] = useState(false);

  useEffect(() => {
    // Animation timer disabled for now
    // const timeout = setTimeout(() => {
    //   setSmallTitle(true);
    // }, 5000);
    //
    // return () => clearTimeout(timeout);
  }, []);

  return (
    <BrowserRouter>
      <Header shrink={smallTitle} />
      <Box mb={"40px"}>
        <Routes>
          <Route
            path="/"
            element={<JsonFormatter setSmallTitle={setSmallTitle} />}
          />
          <Route
            path="/json-format"
            element={<JsonFormatter setSmallTitle={setSmallTitle} />}
          />
          <Route
            path="/markdown-preview"
            element={<MarkdownPreview setSmallTitle={setSmallTitle} />}
          />
          {/* Fallback to root */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
      <Footer />
    </BrowserRouter>
  );
}
