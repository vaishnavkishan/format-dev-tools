import Grid from "@mui/material/Grid";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import JsonInput from "../components/JsonInput";
import JsonOutput from "../components/JsonOutput";
import { useToast } from "../contexts/ToastContext";
import { DefaultJson } from "../constants";

type FocusTarget = "none" | "input" | "output";

interface JsonFormatterProps {
  setSmallTitle: (shrink: boolean) => void;
}

export default function JsonFormatter({ setSmallTitle }: JsonFormatterProps) {
  const { t } = useTranslation();
  const [input, setInput] = useState(DefaultJson);
  const [error, setError] = useState(false);
  const [isFocused, setIsFocused] = useState<FocusTarget>("none");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const { showToast } = useToast();

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      setError(false);
      setSmallTitle(true);
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
    setSmallTitle(true);
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
      >
        <Grid
          size={{ xs: 12, sm: 6 }}
          display="flex"
          flexDirection="column"
          component="section"
        >
          <JsonInput
            aria-label={t("json_input_area")}
            inputRef={inputRef}
            value={input}
            error={error}
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
            aria-label={t("json_output_area")}
            value={input}
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
