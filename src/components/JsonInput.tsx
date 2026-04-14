import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import { ContentPaste } from "@mui/icons-material";
import { Paper, Stack } from "@mui/material";
import ActionBar from "./ActionBar";
import SectionTabs from "./SectionTabs";
import * as JsonControlStyles from "./JsonControl.styles";
import { useEffect, type Ref } from "react";
import { useTheme } from "@mui/material";
import { motion, useAnimationControls } from "framer-motion";
import { useTranslation } from "react-i18next";
import ClearAllIcon from "@mui/icons-material/ClearAll";

interface JsonInputProps {
  value: string;
  error?: boolean; // pass directly to MUI
  viewMode: "split" | "tabbed";
  showViewToggle?: boolean;
  onToggleView: () => void;
  onPaste: (val: string) => void;
  onChange: (val: string) => void;
  onCopy: (val: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  isFocused?: boolean;
  onClear: () => void;
  inputRef: Ref<HTMLTextAreaElement | null>;
}
const MotionJsonTextareaWrapper = motion.create(
  JsonControlStyles.JsonTextareaWrapper,
);

export default function JsonInput({
  value,
  error,
  viewMode,
  showViewToggle,
  onToggleView,
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
  const controls = useAnimationControls();
  const { t } = useTranslation();

  const boxColor = error
    ? theme.palette.error.main
    : theme.palette.primary.main;

  useEffect(() => {
    if (isFocused) {
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
      controls.start({
        boxShadow: "none",
        transition: { duration: 0.3, ease: "easeOut" },
      });
    }
  }, [isFocused, error, boxColor, controls]);

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
              label: t("json_input_label", "JSON Input"),
            },
          ]}
        />
        <ActionBar
          actions={[
            {
              key: "paste",
              tooltip: t("paste_input_json", "Paste JSON from clipboard"),
              icon: <ContentPaste />,
              onClick: () => onPaste(value),
            },
            {
              key: "clear",
              tooltip: t("clear_json", "Clear JSON"),
              icon: <ClearAllIcon />,
              onClick: onClear,
              hoverColor: "error.main",
            },
            {
              key: "copy",
              tooltip: t("copy_input_json", "Copy input JSON"),
              icon: <ContentCopyIcon />,
              onClick: () => onCopy(value),
            },
            ...(showViewToggle
              ? [
                  {
                    key: "toggleView",
                    tooltip: t(
                      "json_toggle_view_tooltip",
                      "Toggle between Split and Tabbed view",
                    ),
                    icon:
                      viewMode === "split" ? (
                        <ViewStreamIcon />
                      ) : (
                        <ViewQuiltIcon />
                      ),
                    onClick: onToggleView,
                  },
                ]
              : []),
          ]}
        />
      </Stack>

      <MotionJsonTextareaWrapper
        animate={controls}
        initial={false}
        onClick={onFocus}
        sx={{ flexGrow: 1, minHeight: 0 }}
      >
        <label
          id="json-input-label"
          htmlFor="json-input-textarea"
          className="sr-only"
        >
          {t("json_input_label")}
        </label>

        <p id="json-input-instructions" className="sr-only">
          {t("json_input_instructions")}
        </p>

        <JsonControlStyles.JsonTextArea
          id="json-input-textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={t(
            "json_input_placeholder",
            "Paste or type JSON here...",
          )}
          tabIndex={0}
          aria-labelledby="json-input-label"
          aria-describedby="json-input-instructions"
          aria-invalid={!!error}
          sx={{ flexGrow: 1 }}
          ref={inputRef}
        />
      </MotionJsonTextareaWrapper>
    </Paper>
  );
}
