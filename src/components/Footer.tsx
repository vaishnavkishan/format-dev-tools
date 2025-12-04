import { Box, Link, Paper, Typography } from "@mui/material";

export default function Footer() {
  return (
    <footer>
      <Box
        component={Paper}
        sx={{
          py: 1,
          textAlign: "center",
          position: "fixed",
          bottom: 0,
          width: "100%",
          mt: "auto",
        }}
      >
        <Typography variant="body2">
          Made 👨🏽‍💻 by Kishan Vaishnav
          {" • "}
          <Link
            href="https://github.com/vaishnavkishan"
            target="_blank"
            underline="hover"
            sx={{ ml: 1 }}
          >
            GitHub
          </Link>
          {" • "}
          <Link
            href="https://www.linkedin.com/in/kishan-vaishnav/"
            target="_blank"
            underline="hover"
            sx={{ ml: 1 }}
          >
            LinkedIn
          </Link>
        </Typography>
      </Box>
    </footer>
  );
}
