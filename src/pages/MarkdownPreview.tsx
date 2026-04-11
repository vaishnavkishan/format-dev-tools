import Grid from "@mui/material/Grid";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  TextField,
  Paper,
  Typography,
  Stack,
  Link,
  Tabs,
  Tab,
  Tooltip,
  IconButton,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import { DefaultMarkdown } from "../constants";
import { useToast } from "../contexts/ToastContext";
import { CopyAll } from "@mui/icons-material";

export default function MarkdownPreview() {
  const { t } = useTranslation();
  const [input, setInput] = useState(DefaultMarkdown);
  const [isFocused, setIsFocused] = useState(false);
  const [previewTab, setPreviewTab] = useState(0);
  const [viewMode, setViewMode] = useState<"split" | "tabbed">("split");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const { showToast } = useToast();

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch (err) {
      console.error("Failed to read clipboard: ", err);
    }
  }

  function handleCopy() {
    navigator.clipboard
      .writeText(input)
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

  function handleCopyPreview() {
    const previewElement = document.getElementById("markdown-preview-content");
    if (previewElement) {
      const html = previewElement.innerHTML;
      navigator.clipboard
        .writeText(html)
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
  }

  return (
    <main>
      <Grid
        container
        justifyContent="center"
        spacing={2}
        sx={{ p: 2 }}
        alignItems="stretch"
      >
        {/* Input Section */}
        <Grid size={viewMode === "split" ? { xs: 12, sm: 6 } : 12}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "80vh",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Tabs value={0} sx={{ minHeight: "auto" }}>
                <Tab
                  label={t("markdown_input_label", "Markdown Input")}
                  sx={{ minHeight: "40px" }}
                />
              </Tabs>
              <Stack direction="row" spacing={1}>
                <Tooltip
                  title={t("markdown_paste_tooltip", "Paste from clipboard")}
                  arrow
                >
                  <IconButton
                    size="small"
                    onClick={handlePaste}
                    aria-label={t(
                      "markdown_paste_tooltip",
                      "Paste from clipboard",
                    )}
                    sx={{ "&:hover": { color: "primary.main" } }}
                  >
                    <ContentPasteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title={t(
                    "markdown_copy_raw_tooltip",
                    "Copy raw Markdown source",
                  )}
                  arrow
                >
                  <IconButton
                    size="small"
                    onClick={handleCopy}
                    aria-label={t(
                      "markdown_copy_raw_tooltip",
                      "Copy raw Markdown source",
                    )}
                    sx={{ "&:hover": { color: "primary.main" } }}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title={t(
                    "markdown_toggle_view_tooltip",
                    "Toggle between Split and Tabbed view",
                  )}
                  arrow
                >
                  <IconButton
                    size="small"
                    onClick={() =>
                      setViewMode((v) => (v === "split" ? "tabbed" : "split"))
                    }
                    aria-label={t(
                      "markdown_toggle_view_tooltip",
                      "Toggle between Split and Tabbed view",
                    )}
                    sx={{ "&:hover": { color: "primary.main" } }}
                  >
                    {viewMode === "split" ? (
                      <ViewStreamIcon fontSize="small" />
                    ) : (
                      <ViewQuiltIcon fontSize="small" />
                    )}
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title={t("markdown_clear_tooltip", "Clear Content")}
                  arrow
                >
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => {
                      setInput("");
                    }}
                    aria-label={t("markdown_clear_tooltip", "Clear Content")}
                    sx={{ "&:hover": { color: "primary.error" } }}
                  >
                    <ClearAllIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
            <TextField
              multiline
              fullWidth
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => {
                setIsFocused(true);
              }}
              onBlur={() => setIsFocused(false)}
              inputRef={inputRef}
              placeholder={t("markdown_placeholder", "Enter markdown here...")}
              sx={{
                flexGrow: 1,
                minHeight: 0,
                "& .MuiInputBase-root": {
                  height: "100%",
                  alignItems: "flex-start",
                  fontFamily: "monospace",
                },
                "& .MuiInputBase-input": {
                  height: "100% !important",
                  overflow: "auto !important",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: isFocused ? "primary.main" : "divider",
                },
              }}
            />
          </Paper>
        </Grid>

        {/* Preview Section */}
        <Grid size={viewMode === "split" ? { xs: 12, sm: 6 } : 12}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              height: "80vh",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Tabs
                value={previewTab}
                onChange={(_, v) => setPreviewTab(v)}
                sx={{ minHeight: "auto" }}
              >
                <Tab
                  label={t("markdown_preview_tab", "Preview")}
                  sx={{ minHeight: "40px" }}
                />
                <Tab
                  label={t("markdown_raw_tab", "Markdown Source")}
                  sx={{ minHeight: "40px" }}
                />
              </Tabs>
              <Stack direction="row" spacing={1}>
                <Tooltip
                  title={t(
                    "markdown_copy_preview_tooltip",
                    "Copy rendered HTML output",
                  )}
                  arrow
                >
                  <IconButton
                    size="small"
                    onClick={handleCopyPreview}
                    aria-label={t(
                      "markdown_copy_preview_tooltip",
                      "Copy rendered HTML output",
                    )}
                    sx={{ "&:hover": { color: "primary.main" } }}
                  >
                    <CopyAll fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title={t("markdown_copy_raw_tooltip", "Copy Markdown source")}
                  arrow
                >
                  <IconButton
                    size="small"
                    onClick={handleCopy}
                    aria-label={t(
                      "markdown_copy_raw_tooltip",
                      "Copy Markdown source",
                    )}
                    sx={{ "&:hover": { color: "primary.main" } }}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title={t(
                    "markdown_toggle_view_tooltip",
                    "Toggle between Split and Tabbed view",
                  )}
                  arrow
                >
                  <IconButton
                    size="small"
                    onClick={() =>
                      setViewMode((v) => (v === "split" ? "tabbed" : "split"))
                    }
                    aria-label={t(
                      "markdown_toggle_view_tooltip",
                      "Toggle between Split and Tabbed view",
                    )}
                    sx={{ "&:hover": { color: "primary.main" } }}
                  >
                    {viewMode === "split" ? (
                      <ViewStreamIcon fontSize="small" />
                    ) : (
                      <ViewQuiltIcon fontSize="small" />
                    )}
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>

            <Box
              id="markdown-preview-content"
              sx={{
                color: "text.primary",
                flexGrow: 1,
                overflowY: "auto",
                minHeight: 0,
              }}
            >
              {previewTab === 0 ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    h1: ({ ...props }) => (
                      <Typography variant="h3" gutterBottom {...props} />
                    ),
                    h2: ({ ...props }) => (
                      <Typography variant="h4" gutterBottom {...props} />
                    ),
                    h3: ({ ...props }) => (
                      <Typography variant="h5" gutterBottom {...props} />
                    ),
                    p: ({ ...props }) => (
                      <Typography variant="body1" paragraph {...props} />
                    ),
                    blockquote: ({ ...props }) => (
                      <Box
                        component="blockquote"
                        sx={{
                          pl: 2,
                          py: 1,
                          my: 2,
                          mx: 0,
                          borderLeft: "4px solid",
                          borderColor: "primary.main",
                          bgcolor: "action.hover",
                          fontStyle: "italic",
                          color: "text.secondary",
                          "& p:last-child": { mb: 0 },
                        }}
                        {...props}
                      />
                    ),
                    ul: ({ ...props }) => (
                      <Box
                        component="ul"
                        sx={{ pl: 4, mb: 2, listStyleType: "disc" }}
                        {...props}
                      />
                    ),
                    ol: ({ ...props }) => (
                      <Box
                        component="ol"
                        sx={{ pl: 4, mb: 2, listStyleType: "decimal" }}
                        {...props}
                      />
                    ),
                    li: ({ ...props }) => (
                      <Typography component="li" variant="body1" {...props} />
                    ),
                    a: ({ ...props }) => (
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                      />
                    ),
                    img: ({ ...props }) => (
                      <Box
                        component="img"
                        sx={{
                          maxWidth: "100%",
                          height: "auto",
                          borderRadius: 1,
                          my: 1,
                        }}
                        {...props}
                      />
                    ),
                    code: ({ ...props }) => (
                      <code
                        style={{
                          backgroundColor: "rgba(255,255,255,0.1)",
                          padding: "2px 4px",
                          borderRadius: "4px",
                        }}
                        {...props}
                      />
                    ),
                    table: ({ ...props }) => (
                      <Box
                        component="table"
                        sx={{
                          borderCollapse: "collapse",
                          width: "100%",
                          mb: 2,
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                        {...props}
                      />
                    ),
                    th: ({ ...props }) => (
                      <Box
                        component="th"
                        sx={{
                          border: "1px solid",
                          borderColor: "divider",
                          p: 1,
                          backgroundColor: "action.hover",
                          fontWeight: "bold",
                          textAlign: "left",
                        }}
                        {...props}
                      />
                    ),
                    td: ({ ...props }) => (
                      <Box
                        component="td"
                        sx={{
                          border: "1px solid",
                          borderColor: "divider",
                          p: 1,
                        }}
                        {...props}
                      />
                    ),
                  }}
                >
                  {input}
                </ReactMarkdown>
              ) : (
                <Box
                  component="pre"
                  sx={{
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    fontFamily: "monospace",
                    fontSize: "0.875rem",
                    p: 1,
                    bgcolor: "action.hover",
                  }}
                >
                  {input}
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </main>
  );
}
