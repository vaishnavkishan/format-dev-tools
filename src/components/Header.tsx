import { Box, Typography, Grid } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/logo.svg";

interface HeaderProps {
  shrink?: boolean;
}

export default function Header({ shrink = false }: HeaderProps) {
  return (
    <>
      <BigScreenHeader shrink={shrink} />
      <MobileHeader />
    </>
  );
}

// 🖥️ Big screen header with smooth subtitle animation
function BigScreenHeader({ shrink }: { shrink: boolean }) {
  const initialLogoHeight = 80;
  const initialTitleSize = 32;
  const initialMarginTop = 48;
  const initialMarginBottom = 60;

  return (
    <motion.div
      initial={{
        marginTop: initialMarginTop,
        marginBottom: initialMarginBottom,
      }}
      animate={{
        marginTop: shrink ? 10 : initialMarginTop,
        marginBottom: shrink ? 10 : initialMarginBottom,
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    >
      {/* Logo */}
      <motion.img
        src={Logo}
        alt="Logo"
        initial={{ height: initialLogoHeight }}
        animate={{ height: shrink ? 48 : initialLogoHeight }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ width: "auto", objectFit: "contain" }}
      />

      {/* Title + Subtitle */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap={0.5}
      >
        {/* Animate font size of title */}
        <Box>
          <Typography
            component={motion.h3}
            initial={{ fontSize: initialTitleSize }}
            animate={{ fontSize: shrink ? 18 : initialTitleSize }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            variant="h3"
            color="text.primary"
            fontWeight="bold"
          >
            Format Dev-Tools
          </Typography>
        </Box>

        {/* Animate subtitle with fade + slide */}
        <AnimatePresence>
          {!shrink && (
            <motion.div
              key="subtitle"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: "1.1rem" }}
              >
                Format, view, and explore your JSON locally.
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </motion.div>
  );
}

// 📱 Mobile header remains static
function MobileHeader() {
  return (
    <Grid
      container
      display={{ xs: "flex", sm: "none" }}
      alignItems="center"
      spacing={2}
      sx={{ mb: 2, p: 2 }}
    >
      <Grid size="auto">
        <Box
          component="img"
          src={Logo}
          alt="Logo"
          sx={{ height: 64, width: "auto", objectFit: "contain" }}
        />
      </Grid>

      <Grid size="grow">
        <Typography
          variant="h5"
          color="text.primary"
          fontWeight="bold"
          lineHeight={1.2}
          sx={{ fontSize: "1.5rem" }}
        >
          Format Dev-Tools
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5, fontSize: "0.9rem", lineHeight: 1.3 }}
        >
          Format and explore your JSON locally.
        </Typography>
      </Grid>
    </Grid>
  );
}
