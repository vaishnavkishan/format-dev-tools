import Grid from "@mui/material/Grid";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import JsonInput from "../components/JsonInput";
import JsonOutput from "../components/JsonOutput";
import { useToast } from "../contexts/ToastContext";
import { DefaultJson } from "../constants";

type FocusTarget = "none" | "input" | "output";

export default function JsonFormatter() {
  const { t } = useTranslation();
  const [input, setInput] = useState(DefaultJson);
  const [error, setError] = useState(false);
  const [isFocused, setIsFocused] = useState<FocusTarget>("none");
  const [viewMode, setViewMode] = useState<"split" | "tabbed">("split");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const { showToast } = useToast();

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
          message: t("copy_success"),
          type: "success",
          duration: 1000,
        });
      })
      .catch((err) => {
        showToast({
          message: t("copy_failure"),
          type: "error",
          duration: 1000,
        });
        console.error("Failed to copy: ", err);
      });
  }

  function handleFocus(control: FocusTarget) {
    setIsFocused(control);
  }

  function handleBlur() {
    setIsFocused("none");
  }

  function handleError() {
    setError(true);
  }

  return (
    <main>
      <Grid
        container
        justifyContent="center"
        spacing={1}
        alignItems="stretch"
        component="section"
        sx={{ fontSize: "0.9rem", p: 2 }}
      >
        <Grid
          size={viewMode === "split" ? { xs: 12, sm: 6 } : 12}
          display="flex"
          flexDirection="column"
          component="section"
        >
          <JsonInput
            aria-label={t("json_input_area")}
            inputRef={inputRef}
            value={input}
            error={error}
            viewMode={viewMode}
            onToggleView={() =>
              setViewMode((v) => (v === "split" ? "tabbed" : "split"))
            }
            isFocused={isFocused === "input"}
            onPaste={handlePaste}
            onChange={(newValue: string) => {
              setError(false);
              setInput(newValue);
            }}
            onFocus={() => handleFocus("input")}
            onBlur={handleBlur}
            onCopy={handleCopy}
            onClear={() => {
              setInput("");
            }}
          />
        </Grid>
        <Grid
          size={viewMode === "split" ? { xs: 12, sm: 6 } : 12}
          display="flex"
          flexDirection="column"
          component="section"
        >
          <JsonOutput
            aria-label={t("json_output_area")}
            value={input}
            viewMode={viewMode}
            onToggleView={() =>
              setViewMode((v) => (v === "split" ? "tabbed" : "split"))
            }
            isFocused={isFocused === "output"}
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
