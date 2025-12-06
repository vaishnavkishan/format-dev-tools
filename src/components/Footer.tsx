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

  const currentLang = i18n.language || "en";

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
        <Typography variant="body2">
          {t("developedBy")}
          {" • "}
          <Link
            href="https://github.com/vaishnavkishan"
            target="_blank"
            underline="hover"
            sx={{ ml: 1 }}
          >
            {t("github")}
          </Link>
          {" • "}
          <Link
            href="https://www.linkedin.com/in/kishan-vaishnav/"
            target="_blank"
            underline="hover"
            sx={{ ml: 1 }}
          >
            {t("linkedin")}
          </Link>
        </Typography>

        {/* Right Side Language Selector */}
        <Select
          size="small"
          value={currentLang}
          onChange={handleLanguageChange}
          sx={{ minWidth: 100 }}
          aria-label="Change app language"
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
