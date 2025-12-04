import "./App.css";
import Grid from "@mui/material/Grid";
import JsonInput from "./components/JsonInput";
import Header from "./components/Header";
import { useEffect, useRef, useState } from "react";
import JsonOutput from "./components/JsonOutput";
import { useToast } from "./contexts/ToastContext";
import Footer from "./components/Footer";
import { Box } from "@mui/material";
import { DefaultJson } from "./constants";

type FocusTarget = "none" | "input" | "output";

export default function App() {
  const [smallTitle, setSmallTitle] = useState(false);
  const [error, setError] = useState(false);
  const [isFocused, setIsFocused] = useState<FocusTarget>("none");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSmallTitle(true);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const [input, setInput] = useState(DefaultJson);

  return (
    <>
      <Header shrink={smallTitle} />
      <Box mb={"40px"}>{main()}</Box>
      <Footer />
    </>
  );
  function main() {
    return (
      <main>
        <Grid
          container
          justifyContent="center"
          spacing={1}
          alignItems="stretch"
          component="section"
        >
          <Grid
            size={{ xs: 12, sm: 6 }}
            display="flex"
            flexDirection="column"
            component="section"
          >
            <JsonInput
              aria-label="JSON input area"
              inputRef={inputRef}
              value={input}
              error={error}
              isFocused={isFocused == "input"}
              onPaste={handlePaste}
              onChange={(newValue: string) => {
                setError(false);
                setInput(newValue);
              }}
              onFocus={() => handleFocus("input")}
              onBlur={handleBlur}
              onCopy={handleCopy}
              onClear={() => {
                setSmallTitle(false);
                setInput("");
              }}
            />
          </Grid>
          <Grid
            size={{ xs: 12, sm: 6 }}
            display="flex"
            flexDirection="column"
            component="section"
          >
            <JsonOutput
              aria-label="Formatted JSON output area"
              // height={inputHeight}
              value={input}
              isFocused={isFocused == "output"}
              onBlur={handleBlur}
              onCopy={handleCopy}
              onFocus={() => handleFocus("output")}
              onError={handleError}
            />
          </Grid>
        </Grid>
      </main>
    );
  }
  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      setError(false);
    } catch (err) {
      console.error("Failed to read clipboard: ", err);
    }
  }
  function handleCopy(text: string) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showToast({
          message: "Copied to clipboard!",
          type: "success",
          duration: 1000,
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }
  function handleFocus(control: FocusTarget) {
    setIsFocused(control);
    setSmallTitle(true);
  }
  function handleBlur() {
    console.log("blurred!");
    setIsFocused("none");
  }
  function handleError() {
    setError(true);
  }
}
