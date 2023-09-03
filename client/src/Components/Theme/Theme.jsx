import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1100,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: ["Inter", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"].join(),
  },
});

export const Theme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
