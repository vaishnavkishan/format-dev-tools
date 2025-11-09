import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CloseIcon from "@mui/icons-material/Close";
import { ContentPaste } from "@mui/icons-material";
import {
  ActionButtons,
  CustomIconButton,
  JsonTextarea,
  JsonTextareaWrapper,
  ToolBar,
} from "./JsonControl.styles";
import { type Ref } from "react";
import { Tooltip, useTheme } from "@mui/material";
import { motion } from "framer-motion";

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
const MotionJsonTextareaWrapper = motion(JsonTextareaWrapper);

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
  inputRef,
}: JsonInputProps) {
  const theme = useTheme();

  const boxColor = error
    ? theme.palette.error.main
    : theme.palette.primary.main;
  return (
    <MotionJsonTextareaWrapper
      initial={{
        boxShadow: isFocused ? `${boxColor} 0px 0px 3px 1px` : "none",
      }}
      animate={{
        boxShadow: isFocused ? `${boxColor} 0px 0px 10px 1px` : "none",
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        repeatType: "mirror",
        repeat: Infinity,
      }}
      id="json-input-wrapper"
      sx={{
        boxShadow: isFocused ? `${boxColor} 0px 0px 5px 3px` : "none",
      }}
      onClick={onFocus}
    >
      <JsonTextarea
        id="json-input-textarea"
        inputRef={inputRef}
        multiline
        minRows={30}
        maxRows={60}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder="Paste your raw JSON here..."
        tabIndex={0}
        sx={{
          flexGrow: "inherit",
        }}
      />
      <ActionButtons>
        <Tooltip title="Paste from clipboard" arrow>
          <CustomIconButton
            size="small"
            onClick={() => onPaste(value)}
            aria-label="Paste JSON in control"
          >
            <ContentPaste fontSize="small" />
          </CustomIconButton>
        </Tooltip>
        <Tooltip title="Clear input" arrow>
          <CustomIconButton
            size="small"
            onClick={onClear}
            aria-label="Clear JSON input"
          >
            <CloseIcon fontSize="small" />
          </CustomIconButton>
        </Tooltip>{" "}
      </ActionButtons>
      <ToolBar>
        <Tooltip title="Copy input" arrow>
          <CustomIconButton
            size="small"
            onClick={() => onCopy(value)}
            aria-label="Copy JSON input"
          >
            <ContentCopyIcon fontSize="small" />
          </CustomIconButton>
        </Tooltip>
      </ToolBar>
    </MotionJsonTextareaWrapper>
  );
}
