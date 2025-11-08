import "./App.css";
import Grid from "@mui/material/Grid";
import JsonInput from "./components/JsonInput";
import Header from "./components/Header";
import { useEffect, useRef, useState } from "react";
import JsonOutput from "./components/JsonOutput";
import { useToast } from "./components/ToastContext";
import Footer from "./components/Footer";
import { Box } from "@mui/material";

type FocusTarget = "none" | "input" | "output";

export default function App() {
  const [smallTitle, setSmallTitle] = useState(false);
  // const [inputHeight, setInputHeight] = useState(400);
  const [isFocused, setIsFocused] = useState<FocusTarget>("none");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSmallTitle(true);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const [input, setInput] = useState(
    `
    {
  "array": [
    1,
    2,
    3
  ],
  "boolean": true,
  "color": "gold",
  "font-color": "red",
  "null": null,
  "number": 123,
  "object": {
    "a": "b",
    "c": "d"
  },
  "string": "Hello World"
}
    `
  );
  // useEffect(() => {
  //   if (inputRef.current) {
  //     console.log("Setting height:", inputRef.current.offsetHeight);
  //     setInputHeight(inputRef.current.offsetHeight);
  //   }
  // }, [input]);
  return (
    <>
      <Header shrink={smallTitle} />
      <Box mb={"40px"}>{main()}</Box>
      <Footer />
    </>
  );
  function main() {
    return (
      <Grid container justifyContent="center" spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }} display="flex" flexDirection="column">
          <JsonInput
            inputRef={inputRef}
            value={input}
            isFocused={isFocused == "input"}
            onPaste={handlePaste}
            onChange={(newValue: string) => {
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
        <Grid size={{ xs: 12, sm: 6 }} flexGrow={1}>
          <JsonOutput
            // height={inputHeight}
            value={input}
            isFocused={isFocused == "output"}
            onBlur={handleBlur}
            onCopy={handleCopy}
            onFocus={() => handleFocus("output")}
          />
        </Grid>
      </Grid>
    );
  }
  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
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
    setIsFocused("none");
  }
}
