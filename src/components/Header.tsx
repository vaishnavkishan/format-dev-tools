import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  keyframes,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { useTranslation } from "react-i18next";

const metallicShine = keyframes`
  0% {
    background-position: -150% 0;
    filter: brightness(1);
  }
  5% {
    filter: brightness(1.5) drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
  }
  10% {
    background-position: 150% 0;
    filter: brightness(1);
  }
  100% {
    background-position: 150% 0;
    filter: brightness(1);
  }
`;

const hoverShine = keyframes`
  from {
    background-position: -150% 0;
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.8) drop-shadow(0 0 12px rgba(255, 255, 255, 0.6));
  }
  to {
    background-position: 150% 0;
    filter: brightness(1);
  }
`;

export default function Header() {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="inherit" elevation={1} sx={{ mb: 1 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo and App Name */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Box
            component="img"
            src={Logo}
            alt="Logo"
            sx={{ height: 32, mr: 1.5, width: "auto", objectFit: "contain" }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "baseline" },
              gap: { xs: 0, sm: 1.5 },
            }}
          >
            <Typography
              variant="h6"
              component="div"
              fontWeight="bold"
              sx={{ lineHeight: 1.2 }}
            >
              {t("title")}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                letterSpacing: 0.5,
                background: (theme) => `linear-gradient(
                  110deg,
                  ${theme.palette.text.secondary} 35%,
                  ${theme.palette.primary.light} 45%,
                  #fff 50%,
                  ${theme.palette.primary.light} 55%,
                  ${theme.palette.text.secondary} 65%
                )`,
                backgroundSize: "200% 100%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                animation: `${metallicShine} 30s infinite linear`,
                "&:hover": {
                  animation: `${hoverShine} 3s ease-in-out forwards`,
                  cursor: "default",
                  opacity: 1,
                },
                display: "inline-block",
                opacity: 0.9,
              }}
            >
              {t("tagline", "Ad-free • Local • Fast")}
            </Typography>
          </Box>
        </Box>

        {/* Burger Navbar */}
        <Box>
          <IconButton
            size="large"
            edge="end"
            color="primary"
            aria-label={t("menu", "Menu")}
            onClick={handleMenu}
            sx={{ borderRadius: 1, px: 1.5 }}
          >
            <MenuIcon />
            <Typography variant="body2" sx={{ ml: 1, fontWeight: 600 }}>
              {t("more", "More")}
            </Typography>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem component={Link} to="/json-format" onClick={handleClose}>
              {t("json_formatter", "JSON Formatter")}
            </MenuItem>
            <MenuItem
              component={Link}
              to="/markdown-preview"
              onClick={handleClose}
            >
              {t("markdown_preview", "Markdown Preview")}
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
