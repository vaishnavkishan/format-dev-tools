import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Delete } from "@mui/icons-material";
import {
  ActionButtons,
  CustomIconButton,
  JsonOutputArea,
  JsonTextareaWrapper,
  ToolBar,
} from "./JsonControl.styles";
import { Tooltip, useTheme } from "@mui/material";
import { motion } from "framer-motion";

interface JsonOutputProps {
  value: string;
  onCopy: (val: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onError: () => void;
  isFocused?: boolean;
}

export default function JsonOutput({
  value: input,
  onCopy,
  onFocus,
  isFocused,
  onBlur,
  onError,
}: JsonOutputProps) {
  const formattedInput = formatJson(input);
  const theme = useTheme();
  const MotionJsonTextareaWrapper = motion(JsonTextareaWrapper);

  return (
    <MotionJsonTextareaWrapper
      initial={{
        boxShadow: isFocused
          ? `${theme.palette.warning.light} 0px 0px 3px 1px`
          : "none",
      }}
      animate={{
        boxShadow: isFocused
          ? `${theme.palette.warning.main} 0px 0px 10px 1px`
          : "none",
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        repeatType: "mirror",
        repeat: Infinity,
      }}
      sx={{
        maxHeight: "80vh",
        boxShadow: isFocused
          ? `${theme.palette.warning.main} 0px 0px 5px 3px`
          : "none",
      }}
      onClick={onFocus}
      onBlur={onBlur}
    >
      <JsonOutputArea
        sx={{
          flexGrow: "inherit",
        }}
        dangerouslySetInnerHTML={{
          __html: input
            ? formattedInput
              ? highlightJson(formattedInput)
              : `<span style="color:${theme.palette.error.main.toString()}">Invalid JSON</span>`
            : `<span style="color:${theme.palette.warning.main.toString()}">Please enter some JSON</span>`,
        }}
      />
      <ActionButtons>
        <Tooltip title="Copy formatted json" arrow>
          <CustomIconButton
            size="small"
            onClick={() => {
              onCopy(formattedInput);
            }}
            aria-label="Copy formatted JSON"
          >
            <ContentCopyIcon fontSize="small" />
          </CustomIconButton>
        </Tooltip>
      </ActionButtons>
      <ToolBar>
        <CustomIconButton size="small" aria-label="delete">
          <Delete />
        </CustomIconButton>
      </ToolBar>
    </MotionJsonTextareaWrapper>
  );
  function formatJson(jsonString: string): string {
    try {
      const parsed = JSON.parse(jsonString);
      return JSON.stringify(parsed, null, 2);
    } catch {
      onError();
      return "";
    }
  }
}

function highlightJson(jsonString: string): string {
  if (!jsonString) return "";

  // 🎨 Local color/class constants — easy to tweak
  const keyColor = "text-amber-400";
  const stringColor = "text-green-400";
  const numberColor = "text-blue-400";
  const booleanColor = "text-purple-400";
  const nullColor = "text-gray-400 italic";
  const defaultColor = "text-gray-200";

  // 🧩 Escape HTML special chars to prevent XSS
  const escaped = jsonString
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // ✨ Highlight JSON tokens
  return escaped.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|\b-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?\b)/g,
    (match) => {
      let colorClass = defaultColor;

      if (/^"/.test(match)) {
        if (/:$/.test(match)) colorClass = keyColor; // key
        else colorClass = stringColor; // string value
      } else if (/true|false/.test(match)) {
        colorClass = booleanColor;
      } else if (/null/.test(match)) {
        colorClass = nullColor;
      } else if (/^-?\d+/.test(match)) {
        colorClass = numberColor;
      }

      return `<span class="${colorClass}">${match}</span>`;
    }
  );
}
