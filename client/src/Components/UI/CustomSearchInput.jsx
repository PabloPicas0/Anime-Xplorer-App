import { SearchRounded } from "@mui/icons-material";
import {
  Collapse,
  Divider,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
  Zoom,
} from "@mui/material";

import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import useSearch from "../Utils/useSearch";

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
  const [userName, setUserName] = useState("");

  const darkMode = useSelector((state) => state.profile.profileFields.options[0].darkMode);
  const mainColor = darkMode ? customSearchInputStyles.colors.dark : customSearchInputStyles.colors.gray;

  const users = useSearch(userName);
  const customSearch = useRef(null);
  console.log(users);

  return (
    <>
      <Paper
        ref={customSearch}
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
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
    </>
  );
};

export default CustomSearchInput;
