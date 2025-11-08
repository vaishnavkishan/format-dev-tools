// Loader.tsx
import { Box, CircularProgress } from "@mui/material";
import Logo from "../assets/logo.svg";

export default function Loader() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#121212",
      }}
    >
      {/* Application logo */}
      <img src={Logo} alt="Logo" width={120} height={120} />
      <CircularProgress sx={{ mt: 3 }} />
    </Box>
  );
}
