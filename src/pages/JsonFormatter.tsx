import Grid from "@mui/material/Grid";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import JsonInput from "../components/JsonInput";
import JsonOutput from "../components/JsonOutput";
import { useToast } from "../contexts/ToastContext";
import { DefaultJson } from "../constants";

type FocusTarget = "none" | "input" | "output";

export default function JsonFormatter() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation();
  const [input, setInput] = useState(DefaultJson);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFocused, setIsFocused] = useState<FocusTarget>("none");
  const [viewMode, setViewMode] = useState<"split" | "tabbed">("split");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const { showToast } = useToast();
  const showViewToggle = !isSmallScreen;

  useEffect(() => {
    if (isSmallScreen && viewMode === "split") {
      setViewMode("tabbed");
    }
  }, [isSmallScreen, viewMode]);

  const formattedInput = useMemo(() => {
    try {
      return JSON.stringify(JSON.parse(input), null, 2);
    } catch {
      return "";
    }
  }, [input]);

  useEffect(() => {
    if (!input.trim()) {
      setError(false);
      setErrorMessage("");
      return;
    }

    try {
      JSON.parse(input);
      setError(false);
      setErrorMessage("");
    } catch (err) {
      setError(true);
      setErrorMessage(
        err instanceof Error ? err.message : String(err ?? "Invalid JSON"),
      );
    }
  }, [input]);

  const sanitizeJsonClipboard = (value: string) =>
    value
      .replace(/&/g, "\\u0026")
      .replace(/</g, "\\u003c")
      .replace(/>/g, "\\u003e");

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText();
      setInput(sanitizeJsonClipboard(text));
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
            showViewToggle={showViewToggle}
            onToggleView={() =>
              setViewMode((v) => (v === "split" ? "tabbed" : "split"))
            }
            isFocused={isFocused === "input"}
            onPaste={handlePaste}
            onChange={(newValue: string) => {
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
            formattedValue={formattedInput}
            error={error}
            errorMessage={errorMessage}
            viewMode={viewMode}
            showViewToggle={showViewToggle}
            onToggleView={() =>
              setViewMode((v) => (v === "split" ? "tabbed" : "split"))
            }
            isFocused={isFocused === "output"}
            onBlur={handleBlur}
            onCopy={handleCopy}
            onFocus={() => handleFocus("output")}
            onShowErrorDetails={() => {
              if (errorMessage) {
                showToast({
                  message: errorMessage,
                  type: "error",
                  duration: 4000,
                });
              }
            }}
          />
        </Grid>
      </Grid>
    </main>
  );
}
