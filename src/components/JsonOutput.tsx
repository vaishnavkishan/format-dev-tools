import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TextDecrease from "@mui/icons-material/TextDecrease";
import TextIncrease from "@mui/icons-material/TextIncrease";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import { Paper, Stack, useTheme } from "@mui/material";
import { JsonOutputArea, JsonTextareaWrapper } from "./JsonControl.styles";
import ActionBar from "./ActionBar";
import SectionTabs from "./SectionTabs";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface JsonOutputProps {
  value: string;
  viewMode: "split" | "tabbed";
  onToggleView: () => void;
  onCopy: (val: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onError: () => void;
  isFocused?: boolean;
}

const MotionJsonTextareaWrapper = motion.create(JsonTextareaWrapper);

export default function JsonOutput({
  value: input,
  viewMode,
  onToggleView,
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

  const [fontSize, setFontSize] = useState(14);
  const increaseFont = () => setFontSize((prev) => Math.min(prev + 2, 24));
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
    <Paper
      elevation={3}
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        fontSize: "0.9rem",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <SectionTabs
          value={0}
          tabs={[
            {
              value: 0,
              label: t("json_output_label", "JSON Output"),
            },
          ]}
        />
        <ActionBar
          actions={[
            {
              key: "toggleView",
              tooltip: t(
                "json_toggle_view_tooltip",
                "Toggle between Split and Tabbed view",
              ),
              icon:
                viewMode === "split" ? (
                  <ViewStreamIcon fontSize="small" />
                ) : (
                  <ViewQuiltIcon fontSize="small" />
                ),
              onClick: onToggleView,
            },
            {
              key: "copy",
              tooltip: t("copy_output_json", "Copy JSON output"),
              icon: <ContentCopyIcon fontSize="small" />,
              onClick: () => onCopy(formattedInput),
            },
            {
              key: "decreaseFont",
              tooltip: t("decrease_font_size", "Decrease font size"),
              icon: <TextDecrease />,
              onClick: decreaseFont,
            },
            {
              key: "increaseFont",
              tooltip: t("increase_font_size", "Increase font size"),
              icon: <TextIncrease />,
              onClick: increaseFont,
            },
          ]}
        />
      </Stack>

      <MotionJsonTextareaWrapper
        animate={controls}
        initial={false}
        sx={{ flexGrow: 1, minHeight: 0 }}
        onClick={onFocus}
        onBlur={onBlur}
      >
        <JsonOutputArea
          sx={{
            flexGrow: 1,
            minHeight: 0,
            fontSize: `${fontSize}px`,
          }}
          dangerouslySetInnerHTML={{
            __html: input
              ? formattedInput
                ? highlightJson(formattedInput)
                : `<span role="alert" aria-live="assertive" style="color:${theme.palette.error.main.toString()}">${t(
                    "error_invalid_json",
                  )}</span>`
              : `<span style="color:${theme.palette.warning.main.toString()}">${t(
                  "no_json_provided",
                )}</span>`,
          }}
        />
      </MotionJsonTextareaWrapper>
    </Paper>
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
    },
  );
}
