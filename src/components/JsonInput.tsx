import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CloseIcon from "@mui/icons-material/Close";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import { ContentPaste } from "@mui/icons-material";
import { Paper, Stack, Tabs, Tab, Tooltip, IconButton } from "@mui/material";
import * as JsonControlStyles from "./JsonControl.styles";
import { useEffect, type Ref } from "react";
import { useTheme } from "@mui/material";
import { motion, useAnimationControls } from "framer-motion";
import { useTranslation } from "react-i18next";

interface JsonInputProps {
  value: string;
  error?: boolean; // pass directly to MUI
  viewMode: "split" | "tabbed";
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
        <Tabs
          value={0}
          sx={{
            minHeight: "auto",
            "& .MuiTab-root": {
              minHeight: 32,
              fontSize: "0.85rem",
              px: 1,
            },
          }}
        >
          <Tab
            label={t("json_input_label", "JSON Input")}
            sx={{ minHeight: "32px", fontSize: "0.85rem" }}
          />
        </Tabs>
        <Stack direction="row" spacing={1}>
          <Tooltip
            title={t("paste_input_json", "Paste JSON from clipboard")}
            arrow
          >
            <IconButton
              size="small"
              onClick={() => onPaste(value)}
              aria-label={t("paste_input_json", "Paste JSON from clipboard")}
              sx={{
                "&:hover": { color: "primary.main" },
                p: 0.75,
              }}
            >
              <ContentPaste fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title={t("clear_json", "Clear JSON")} arrow>
            <IconButton
              size="small"
              onClick={onClear}
              aria-label={t("clear_json", "Clear JSON")}
              sx={{
                "&:hover": { color: "error.main" },
                p: 0.75,
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={t(
              "json_toggle_view_tooltip",
              "Toggle between Split and Tabbed view",
            )}
            arrow
          >
            <IconButton
              size="small"
              onClick={onToggleView}
              aria-label={t(
                "json_toggle_view_tooltip",
                "Toggle between Split and Tabbed view",
              )}
              sx={{
                "&:hover": { color: "primary.main" },
                p: 0.75,
              }}
            >
              {viewMode === "split" ? (
                <ViewStreamIcon fontSize="small" />
              ) : (
                <ViewQuiltIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title={t("copy_input_json", "Copy input JSON")} arrow>
            <IconButton
              size="small"
              onClick={() => onCopy(value)}
              aria-label={t("copy_input_json", "Copy input JSON")}
              sx={{
                "&:hover": { color: "primary.main" },
                p: 0.75,
              }}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
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
