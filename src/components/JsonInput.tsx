import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CloseIcon from "@mui/icons-material/Close";
import { ContentPaste } from "@mui/icons-material";
import * as JsonControlStyles from "./JsonControl.styles";
import { useEffect, type Ref } from "react";
import { Tooltip, useTheme } from "@mui/material";
import { motion, useAnimationControls } from "framer-motion";
import { JsonTextArea, JsonTextareaWrapper } from "./JsonControl.styles";

interface JsonInputProps {
  value: string;
  error?: boolean; // pass directly to MUI
  onPaste: (val: string) => void;
  onChange: (val: string) => void;
  onCopy: (val: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  isFocused?: boolean;
  isError?: boolean;
  onClear: () => void;
  inputRef: Ref<HTMLTextAreaElement | null>;
}
const MotionJsonTextareaWrapper = motion.create(JsonTextareaWrapper);

export default function JsonInput({
  value,
  error,
  onChange,
  onPaste,
  onFocus,
  onBlur,
  isFocused,
  onCopy,
  onClear,
}: JsonInputProps) {
  const theme = useTheme();
  const controls = useAnimationControls();

  const boxColor = error
    ? theme.palette.error.main
    : theme.palette.primary.main;

  // 🧠 React to focus + error changes
  useEffect(() => {
    if (isFocused) {
      // Focused → start pulsing animation
      controls.start({
        boxShadow: [
          `${boxColor} 0px 0px 3px 1px`,
          `${boxColor} 0px 0px 7px 1px`,
        ],
        transition: {
          duration: 0.7,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        },
      });
    } else {
      // Blur → reset to no shadow
      controls.start({
        boxShadow: "none",
        transition: { duration: 0.3, ease: "easeOut" },
      });
    }
  }, [isFocused, error, boxColor, controls]);

  return (
    <MotionJsonTextareaWrapper
      animate={controls} // 👈 use controlled animation
      initial={false} // prevent initial flicker
      id="json-input-wrapper"
      onClick={onFocus}
    >
      {/* Visible or screen-reader-only label */}
      <label
        id="json-input-label"
        htmlFor="json-input-textarea"
        className="sr-only"
      >
        JSON input
      </label>

      {/* Instructions for screen reader users */}
      <p id="json-input-instructions" className="sr-only">
        Paste or type JSON here. Screen reader users: errors will be announced
        if JSON format is invalid. Press Control plus A to select all text.
      </p>
      <JsonTextArea
        id="json-input-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder="Paste your raw JSON here..."
        tabIndex={0}
        style={{ flexGrow: "inherit" }}
        aria-labelledby="json-input-label"
        aria-describedby="json-input-instructions"
        aria-invalid={!!error} // if you're tracking JSON parse errors
      />
      <JsonControlStyles.ActionButtons>
        <Tooltip title="Paste from clipboard" arrow>
          <JsonControlStyles.CustomIconButton
            size="small"
            onClick={() => onPaste(value)}
            aria-label="Paste JSON in control"
          >
            <ContentPaste fontSize="small" />
          </JsonControlStyles.CustomIconButton>
        </Tooltip>
        <Tooltip title="Clear input" arrow>
          <JsonControlStyles.CustomIconButton
            size="small"
            onClick={onClear}
            aria-label="Clear JSON input"
          >
            <CloseIcon fontSize="small" />
          </JsonControlStyles.CustomIconButton>
        </Tooltip>{" "}
      </JsonControlStyles.ActionButtons>
      <JsonControlStyles.ToolBar>
        <Tooltip title="Copy input" arrow>
          <JsonControlStyles.CustomIconButton
            size="small"
            onClick={() => onCopy(value)}
            aria-label="Copy JSON input"
          >
            <ContentCopyIcon fontSize="small" />
          </JsonControlStyles.CustomIconButton>
        </Tooltip>
      </JsonControlStyles.ToolBar>
    </MotionJsonTextareaWrapper>
  );
}
