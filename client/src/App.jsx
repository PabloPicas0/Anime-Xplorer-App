import "./App.css";

import { AppBar, Button, ButtonGroup, Toolbar, Typography } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const rootStyles = {
  navbar: {
    justifyContent: "space-around",
    backgroundColor: "#2b2d42",
  },
  navbarButtons: {
    color: "whitesmoke",
  },
};

function App() {
  return (
    <>
      <AppBar component={"nav"} id="navbar" sx={rootStyles.container}>
        <Toolbar sx={rootStyles.navbar}>
          <Typography variant="h6" component={"div"}>
            AnimeExplorer
          </Typography>

          <ButtonGroup variant="outlined" aria-label="login/sing up button group">
            <Button>
              <Link to={`login`} style={rootStyles.navbarButtons}>
                Login
              </Link>
            </Button>
            <Button>
              <Link to={`signup`} style={rootStyles.navbarButtons}>
                Sign Up
              </Link>
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default App;
