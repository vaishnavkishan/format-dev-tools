import {
  Box,
  Link,
  Paper,
  Typography,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { i18n, t } = useTranslation();

  // Extract base language (e.g., 'en' from 'en-US') and fallback to 'en'
  const baseLang = i18n.language?.split("-")[0] || "en";
  const supportedLangs = ["en", "hi", "gu", "kn"];
  const currentLang = supportedLangs.includes(baseLang) ? baseLang : "en";

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const selectedLang = event.target.value;
    i18n.changeLanguage(selectedLang);
  };

  return (
    <footer>
      <Box
        component={Paper}
        sx={{
          py: 1,
          px: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "fixed",
          bottom: 0,
          width: "100%",
        }}
      >
        {/* Left / Center Content */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.2 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {t("developedBy", "Developed by Kishan Vaishnav")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Link
              href="https://github.com/vaishnavkishan"
              target="_blank"
              underline="hover"
              variant="caption"
              color="primary"
            >
              {t("github", "GitHub")}
            </Link>
            <Typography variant="caption" sx={{ mx: 0.5, opacity: 0.6 }}>
              -
            </Typography>
            <Link
              href="https://www.linkedin.com/in/kishan-vaishnav/"
              target="_blank"
              underline="hover"
              variant="caption"
              color="primary"
            >
              {t("linkedin", "LinkedIn")}
            </Link>
          </Box>
        </Box>

        {/* Right Side Language Selector */}
        <Select
          size="small"
          value={currentLang}
          onChange={handleLanguageChange}
          sx={{ minWidth: 100 }}
          aria-label={t("change_language", "Change app language")}
        >
          <MenuItem value="en">English (English)</MenuItem>
          <MenuItem value="hi">हिन्दी (Hindi)</MenuItem>
          <MenuItem value="gu">ગુજરાતી (Gujarati)</MenuItem>
          <MenuItem value="kn">ಕನ್ನಡ (Kannada)</MenuItem>
        </Select>
      </Box>
    </footer>
  );
}
