import { Person, SearchRounded } from "@mui/icons-material";
import {
  Avatar,
  Collapse,
  Divider,
  Fade,
  IconButton,
  InputBase,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Tooltip,
  Typography,
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
        }}
        square>
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

      <Popper anchorEl={customSearch.current} open={Boolean(users)} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <MenuList
              sx={{
                width: customSearch.current && customSearch.current.offsetWidth,
                backgroundColor: mainColor,
                padding: 0,
                boxShadow:
                  "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 6px 8px 0px rgba(0,0,0,0.12)",
              }}>
              <Divider />

              <MenuItem sx={{ gap: "10px", backgroundColor: "rgba(255, 255, 255, 0.08)" }}>
                <Avatar alt={users?.username}>
                  <Person />
                </Avatar>

                <Typography color={darkMode ? "white" : "black"}>{users?.username}</Typography>
              </MenuItem>
            </MenuList>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default CustomSearchInput;
