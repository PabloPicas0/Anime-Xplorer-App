import { Link } from "react-router-dom";

import { Button, ButtonGroup, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { LoginSharp, Menu as MenuIcon, PersonAddAlt1 } from "@mui/icons-material";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { handleError } from "../Redux/Slices/statusSlice";

const unregistredStyles = {
  desktopLinks: {
    display: { xs: "none", sm: "inline-flex" },
    alignSelf: "center",
  },
  hamburgerMenu: {
    display: { xs: "inline-flex", sm: "none" },
  },
  navbarButtons: {
    color: "whitesmoke",
  },
  menuItem: {
    justifyContent: "center",
  },
  anchor: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    color: "#000",
  },
};

const Unregistered = () => {
  const [userMenu, setUserMenu] = useState(null);

  const dispatch = useDispatch();

  return (
    <>
      <Typography variant="h6" component={"div"} alignSelf={"center"}>
        AnimeExplorer
      </Typography>

      <ButtonGroup
        variant="outlined"
        aria-label="login/sing up button group"
        sx={unregistredStyles.desktopLinks}>
        <Button
          onClick={() =>
            dispatch(
              handleError({
                error: false,
                errorMessage: [{ msg: "" }],
              })
            )
          }>
          <Link to={`login`} style={unregistredStyles.navbarButtons}>
            Login
          </Link>
        </Button>

        <Button
          onClick={() =>
            dispatch(
              handleError({
                error: false,
                errorMessage: [{ msg: "" }],
              })
            )
          }>
          <Link to={`signup`} style={unregistredStyles.navbarButtons}>
            Sign Up
          </Link>
        </Button>
      </ButtonGroup>

      <IconButton
        sx={{ ...unregistredStyles.navbarButtons, ...unregistredStyles.hamburgerMenu }}
        onClick={(e) => setUserMenu(e.currentTarget)}>
        <MenuIcon />
      </IconButton>

      <Menu anchorEl={userMenu} keepMounted open={Boolean(userMenu)} onClose={() => setUserMenu(null)}>
        <MenuItem onClick={() => setUserMenu(null)}>
          <Link to={"signup"} style={unregistredStyles.anchor}>
            <PersonAddAlt1 />
            <Typography fontSize={14}>Sign up</Typography>
          </Link>
        </MenuItem>

        <MenuItem sx={unregistredStyles.menuItem} onClick={() => setUserMenu(null)}>
          <Link to={"login"} style={unregistredStyles.anchor}>
            <LoginSharp />
            <Typography fontSize={14}>Login</Typography>
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Unregistered;
