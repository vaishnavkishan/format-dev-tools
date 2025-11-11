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
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

interface JsonOutputProps {
  value: string;
  onCopy: (val: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onError: () => void;
  isFocused?: boolean;
}
const MotionJsonTextareaWrapper = motion.create(JsonTextareaWrapper);

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
  const controls = useAnimationControls();

  useEffect(() => {
    if (isFocused) {
      controls.start({
        boxShadow: [
          `${theme.palette.warning.main} 0px 0px 3px 1px`,
          `${theme.palette.warning.main} 0px 0px 7px 1px`,
        ],
        transition: {
          duration: 0.7,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        },
      });
    } else {
      controls.start({
        boxShadow: "none",
        transition: { duration: 0.3, ease: "easeOut" },
      });
    }
  }, [controls, isFocused, theme]);

  return (
    <MotionJsonTextareaWrapper
      animate={controls}
      initial={false}
      sx={{
        maxHeight: "80vh",
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
