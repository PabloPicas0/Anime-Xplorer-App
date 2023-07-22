import { Link } from "react-router-dom";

import { Button, ButtonGroup, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { LoginSharp, Menu as MenuIcon, PersonAddAlt1 } from "@mui/icons-material";
import { useState } from "react";

const unregistredStyles = {
  desktopLinks: {
    display: { xs: "none", sm: "inline-flex" },
    alignSelf: "center",
  },
  mobileLinksIcon: {
    display: { xs: "inline-flex", sm: "none" },
  },
  navbarButtons: {
    color: "whitesmoke",
  },
  mobileLinks: {
    flexDirection: "column",
  },
};

const Unregistered = () => {
  const [userMenu, setUserMenu] = useState(null);

  return (
    <>
      <ButtonGroup
        variant="outlined"
        aria-label="login/sing up button group"
        sx={unregistredStyles.desktopLinks}>
        <Button>
          <Link to={`login`} style={unregistredStyles.navbarButtons}>
            Login
          </Link>
        </Button>

        <Button>
          <Link to={`signup`} style={unregistredStyles.navbarButtons}>
            Sign Up
          </Link>
        </Button>
      </ButtonGroup>

      <IconButton
        sx={{ ...unregistredStyles.navbarButtons, ...unregistredStyles.mobileLinksIcon }}
        onClick={(e) => setUserMenu(e.currentTarget)}>
        <MenuIcon />
      </IconButton>

      <Menu anchorEl={userMenu} keepMounted open={Boolean(userMenu)} onClose={() => setUserMenu(null)}>
        <MenuItem sx={unregistredStyles.mobileLinks}>
          <PersonAddAlt1 />
          <Typography fontSize={14}>Sign up</Typography>
        </MenuItem>

        <MenuItem sx={unregistredStyles.mobileLinks}>
          <LoginSharp />
          <Typography fontSize={14}>Login</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Unregistered;
