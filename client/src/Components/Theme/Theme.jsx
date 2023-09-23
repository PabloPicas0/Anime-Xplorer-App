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
      }),
    [options]
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
