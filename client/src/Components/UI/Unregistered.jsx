import { Link } from "react-router-dom";

import { Button, ButtonGroup, IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";

const unregistredStyles = {
  desktopLinks: {
    display: { xs: "none", sm: "inline-flex" },
    alignSelf: "center",
  },
  mobileLinks: {
    display: { xs: "inline-flex", sm: "none" },
  },
  navbarButtons: {
    color: "whitesmoke",
  },
};

const Unregistered = () => {
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

      <IconButton sx={{ ...unregistredStyles.navbarButtons, ...unregistredStyles.mobileLinks }}>
        <Menu />
      </IconButton>
    </>
  );
};

export default Unregistered;
