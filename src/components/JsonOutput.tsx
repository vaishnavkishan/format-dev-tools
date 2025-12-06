import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { TextDecrease, TextIncrease } from "@mui/icons-material";
import {
  ActionButtons,
  CustomIconButton,
  JsonOutputArea,
  JsonTextareaWrapper,
  ToolBar,
} from "./JsonControl.styles";
import { Tooltip, useTheme } from "@mui/material";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  // 🧩 Font size state (default 16px)
  const [fontSize, setFontSize] = useState(16);

  const increaseFont = () => setFontSize((prev) => Math.min(prev + 2, 30));
  const decreaseFont = () => setFontSize((prev) => Math.max(prev - 2, 10));

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
          fontSize: `${fontSize}px`, // 👈 Dynamic font size
        }}
        dangerouslySetInnerHTML={{
          __html: input
            ? formattedInput
              ? highlightJson(formattedInput)
              : `<span role="alert" aria-live="assertive" style="color:${theme.palette.error.main.toString()}">${t(
                  "error_invalid_json"
                )}</span>`
            : `<span style="color:${theme.palette.warning.main.toString()}">${t(
                "no_json_provided"
              )}</span>`,
        }}
      />

      {/* Copy Button */}
      <ActionButtons>
        <Tooltip title={t("copy_output_json")} arrow>
          <CustomIconButton
            size="small"
            onClick={() => {
              onCopy(formattedInput);
            }}
            aria-label={t("copy_output_json")}
          >
            <ContentCopyIcon fontSize="small" />
          </CustomIconButton>
        </Tooltip>
      </ActionButtons>

      {/* Toolbar Section */}
      <ToolBar>
        <Tooltip title={t("decrease_font_size")} arrow>
          <CustomIconButton
            size="small"
            onClick={decreaseFont}
            aria-label={t("decrease_font_size")}
          >
            <TextDecrease />
          </CustomIconButton>
        </Tooltip>

        <Tooltip title={t("increase_font_size")} arrow>
          <CustomIconButton
            size="small"
            onClick={increaseFont}
            aria-label={t("increase_font_size")}
          >
            <TextIncrease />
          </CustomIconButton>
        </Tooltip>
      </ToolBar>
    </MotionJsonTextareaWrapper>
  );

  // --- JSON helpers ---
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

// --- Syntax Highlight ---
function highlightJson(jsonString: string): string {
  if (!jsonString) return "";

  const keyColor = "text-amber-400";
  const stringColor = "text-green-400";
  const numberColor = "text-blue-400";
  const booleanColor = "text-purple-400";
  const nullColor = "text-gray-400 italic";
  const defaultColor = "text-gray-200";

  const escaped = jsonString
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|\b-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?\b)/g,
    (match) => {
      let colorClass = defaultColor;
      if (/^"/.test(match)) {
        if (/:$/.test(match)) colorClass = keyColor;
        else colorClass = stringColor;
      } else if (/true|false/.test(match)) colorClass = booleanColor;
      else if (/null/.test(match)) colorClass = nullColor;
      else if (/^-?\d+/.test(match)) colorClass = numberColor;
      return `<span class="${colorClass}">${match}</span>`;
    }
  );
}
