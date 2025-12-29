"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  palette: {
    primary: {
      main: "#003B59",
    },
    secondary: {
      main: "#EFF4FF",
    },
  },
});

export default theme;
