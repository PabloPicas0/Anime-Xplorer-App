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
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import useSearch from "../Utils/useSearch";

import { handleVisibility } from "../Redux/Slices/menuSlice";

const customSearchInputStyles = {
  paper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    height: { xs: "100%", md: "auto" },
    justifyContent: { xs: "center", md: "normal" },
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
  menuList: {
    padding: 0,
    boxShadow:
      "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 6px 8px 0px rgba(0,0,0,0.12)",
  },
  menuItem: {
    display: "list-item",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  link: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
};

const CustomSearchInput = (props) => {
  const { placement, isAlwaysVisible } = props;
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [userName, setUserName] = useState("");

  const darkMode = useSelector((state) => state.profile.profileFields.options[0].darkMode);
  const mainColor = darkMode ? customSearchInputStyles.colors.dark : customSearchInputStyles.colors.gray;

  const users = useSearch(userName);
  const customSearch = useRef(null);

  const dispatch = useDispatch();

  return (
    <>
      <Paper
        ref={customSearch}
        component={"form"}
        elevation={isSearchVisible || isAlwaysVisible ? 3 : 0}
        sx={{
          ...customSearchInputStyles.paper,
          backgroundColor: mainColor,
        }}
        square>
        <Collapse in={isSearchVisible || isAlwaysVisible} orientation="horizontal">
          <InputBase
            type="search"
            placeholder="Find user"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            inputProps={customSearchInputStyles.input.inputProps}
            sx={customSearchInputStyles.input.inputStyles}
          />
        </Collapse>

        <Collapse in={isSearchVisible || isAlwaysVisible} orientation="horizontal">
          <Divider orientation="vertical" sx={customSearchInputStyles.divider} />
        </Collapse>

        <Tooltip TransitionComponent={Zoom} title="Search" placement={placement} arrow>
          <IconButton
            size="large"
            onClick={() => {
              setIsSearchVisible((prev) => !prev);
              setUserName("");
            }}>
            <SearchRounded />
          </IconButton>
        </Tooltip>
      </Paper>

      <Popper
        anchorEl={customSearch.current}
        open={Boolean((users && isSearchVisible) || (users && isAlwaysVisible))}
        container={customSearch.current?.parentNode}
        sx={{ zIndex: 1099 }}
        transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <MenuList
              sx={{
                ...customSearchInputStyles.menuList,
                width: customSearch.current && customSearch.current.offsetWidth,
                backgroundColor: mainColor,
              }}>
              <Divider />

              <MenuItem sx={customSearchInputStyles.menuItem}>
                <Link
                  style={customSearchInputStyles.link}
                  to={`/user/${users}`}
                  onClick={() => dispatch(handleVisibility(false))}>
                  <Avatar alt={users} sx={{ width: 34, height: 34 }}>
                    <Person />
                  </Avatar>

                  <Typography color={darkMode ? "white" : "black"}>{users}</Typography>
                </Link>
              </MenuItem>
            </MenuList>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default CustomSearchInput;
