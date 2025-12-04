import { Box, Typography, Grid } from "@mui/material";
import { motion, useAnimationControls } from "framer-motion";
import Logo from "../assets/logo.svg";
import { useBreakpoint } from "../contexts/BreakpointContext";
import { useEffect } from "react";

interface HeaderProps {
  shrink?: boolean;
}

export default function Header({ shrink = false }: HeaderProps) {
  const { isXs } = useBreakpoint();
  return <>{isXs ? <MobileHeader /> : <BigScreenHeader shrink={shrink} />}</>;
}

// 🖥️ Big screen header with smooth subtitle animation
function BigScreenHeader({ shrink }: { shrink: boolean }) {
  const initialLogoHeight = 80;
  const initialTitleSize = 32;
  const initialMarginTop = 48;
  const initialMarginBottom = 60;

  const wrapperControls = useAnimationControls();
  const logoControls = useAnimationControls();
  const titleControls = useAnimationControls();
  const subTitleControls = useAnimationControls();

  useEffect(() => {
    async function runAnimations() {
      await subTitleControls.start(
        {
          display: shrink ? "none" : "block",
          y: shrink ? -10 : 0,
          height: shrink ? 0 : 10,
          opacity: shrink ? 0 : 1,
        },
        { duration: 0.4, ease: "easeOut" }
      );
      await wrapperControls.start(
        {
          marginTop: shrink ? 10 : initialMarginTop,
          marginBottom: shrink ? 10 : initialMarginBottom,
        },
        { duration: 0.5, ease: "easeInOut" }
      );
      logoControls.start(
        {
          height: shrink ? 48 : initialLogoHeight,
        },
        { duration: 0.5, ease: "easeInOut" }
      );
      titleControls.start(
        {
          fontSize: shrink ? 18 : initialTitleSize,
        },
        { duration: 0.5, ease: "easeInOut" }
      );
    }
    runAnimations();
  }, [shrink, wrapperControls, logoControls, titleControls, subTitleControls]);

  return (
    <header>
      <motion.div
        animate={wrapperControls}
        initial={{
          marginTop: shrink ? 10 : initialMarginTop,
          marginBottom: shrink ? 10 : initialMarginBottom,
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box display="flex" flexDirection="row" alignItems="center" gap={0.5}>
          {/* Logo */}
          <motion.img
            src={Logo}
            alt="Logo"
            animate={logoControls}
            initial={{
              height: initialLogoHeight,
            }}
            style={{ width: "auto", objectFit: "contain" }}
          />
          {/* Animate font size of title */}
          <Box>
            <Typography
              component={motion.h3}
              animate={titleControls}
              initial={false}
              variant="h3"
              color="text.primary"
              fontWeight="bold"
            >
              Format Dev-Tools
            </Typography>
          </Box>
        </Box>

        {/* Title + Subtitle */}
        <Box>
          {/* Animate subtitle with fade + slide */}
          <motion.div
            key="subtitle"
            animate={subTitleControls}
            initial={{
              display: "none",
              y: -10,
            }}
          >
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: "1.1rem" }}
            >
              Format, view, and explore your JSON locally.
            </Typography>
          </motion.div>
        </Box>
      </motion.div>
    </header>
  );
}

// 📱 Mobile header remains static
function MobileHeader() {
  return (
    <Grid
      container
      display={{ xs: "flex" }}
      alignItems="center"
      spacing={2}
      sx={{ mb: 2, p: 2 }}
      component="section"
    >
      <Grid size="auto" component="section">
        <Box
          component="img"
          src={Logo}
          alt="Logo"
          sx={{ height: 64, width: "auto", objectFit: "contain" }}
        />
      </Grid>

      <Grid size="grow" component="section">
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
