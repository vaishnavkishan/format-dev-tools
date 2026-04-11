import Grid from "@mui/material/Grid";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  TextField,
  Paper,
  Typography,
  Button,
  Stack,
  Link,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { DefaultMarkdown } from "../constants";
import { useToast } from "../contexts/ToastContext";

interface MarkdownPreviewProps {
  setSmallTitle: (shrink: boolean) => void;
}

export default function MarkdownPreview({
  setSmallTitle,
}: MarkdownPreviewProps) {
  const { t } = useTranslation();
  const [input, setInput] = useState(DefaultMarkdown);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const { showToast } = useToast();

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      setSmallTitle(true);
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

  return (
    <main>
      <Grid container justifyContent="center" spacing={2} sx={{ p: 2 }}>
        {/* Input Section */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "70vh",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
            >
              <Typography variant="overline">
                {t("markdown_input_label", "Markdown Input")}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  startIcon={<ContentPasteIcon />}
                  onClick={handlePaste}
                >
                  {t("paste", "Paste")}
                </Button>
                <Button
                  size="small"
                  startIcon={<ContentCopyIcon />}
                  onClick={handleCopy}
                >
                  {t("copy", "Copy")}
                </Button>
                <Button
                  size="small"
                  color="error"
                  startIcon={<ClearAllIcon />}
                  onClick={() => {
                    setInput("");
                    setSmallTitle(false);
                  }}
                >
                  {t("clear", "Clear")}
                </Button>
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
                setSmallTitle(true);
              }}
              onBlur={() => setIsFocused(false)}
              inputRef={inputRef}
              placeholder={t("markdown_placeholder", "Enter markdown here...")}
              sx={{
                flexGrow: 1,
                "& .MuiInputBase-root": {
                  height: "100%",
                  alignItems: "flex-start",
                  fontFamily: "monospace",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: isFocused ? "primary.main" : "divider",
                },
              }}
            />
          </Paper>
        </Grid>

        {/* Preview Section */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              height: "70vh",
              overflowY: "auto",
              backgroundColor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="overline" display="block" mb={2}>
              {t("markdown_preview_label", "Live Preview")}
            </Typography>
            <Box sx={{ color: "text.primary" }}>
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
                      sx={{ border: "1px solid", borderColor: "divider", p: 1 }}
                      {...props}
                    />
                  ),
                }}
              >
                {input}
              </ReactMarkdown>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </main>
  );
}
