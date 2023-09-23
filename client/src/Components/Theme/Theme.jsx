import { ThemeProvider, createTheme } from "@mui/material";

import { useMemo } from "react";
import { useSelector } from "react-redux";

export const Theme = ({ children }) => {
  const options = useSelector((state) => state.profile.profileFields.options[0]);

  const theme = useMemo(
    () =>
      createTheme({
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
          fontFamily: [
            `${options ? options.font : "Inter"}`,
            "system-ui",
            "Avenir",
            "Helvetica",
            "Arial",
            "sans-serif",
          ].join(),
        },
        palette: {
          mode: options ? (options.darkMode ? "dark" : "light") : "light",
          background: {
            default: options ? (options.darkMode ? "#121212" : "#fafafa") : "#edf1f5",
          },
        },
      }),
    [options]
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
