import { SearchRounded } from "@mui/icons-material";
import { Collapse, Divider, IconButton, InputBase, Paper, Tooltip, Zoom } from "@mui/material";

import { useState } from "react";
import { useSelector } from "react-redux";

const customSearchInputStyles = {
  paper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  colors: {
    white: "#fff",
    gray: "#fafafa",
    dark: "#121212",
  },
  input: {
    inputProps: {
      "aria-label": "find user",
    },
    inputStyles: {
      marginLeft: "0.5rem",
    },
  },
  divider: {
    margin: "0.5rem",
    height: "28px",
  },
};

const CustomSearchInput = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const darkMode = useSelector((state) => state.profile.profileFields.options[0].darkMode);
  const mainColor = darkMode ? customSearchInputStyles.colors.dark : customSearchInputStyles.colors.gray;

  return (
    <Paper
      component={"form"}
      elevation={isSearchVisible ? 3 : 0}
      sx={{
        ...customSearchInputStyles.paper,
        backgroundColor: mainColor,
      }}>
      <Collapse in={isSearchVisible} orientation="horizontal">
        <InputBase
          type="search"
          placeholder="Find user"
          inputProps={customSearchInputStyles.input.inputProps}
          sx={customSearchInputStyles.input.inputStyles}
        />
      </Collapse>

      <Collapse in={isSearchVisible} orientation="horizontal">
        <Divider orientation="vertical" sx={customSearchInputStyles.divider} />
      </Collapse>

      <Tooltip TransitionComponent={Zoom} title="Search" arrow>
        <IconButton size="large" onClick={() => setIsSearchVisible((prev) => !prev)}>
          <SearchRounded />
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

export default CustomSearchInput;
