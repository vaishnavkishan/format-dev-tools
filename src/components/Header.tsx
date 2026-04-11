import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { useTranslation } from "react-i18next";

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
    <AppBar position="static" color="inherit" elevation={1} sx={{ mb: 4 }}>
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
          <Typography variant="h6" component="div" fontWeight="bold">
            {t("title")}
          </Typography>
        </Box>

        {/* Burger Navbar */}
        <Box>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon />
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
