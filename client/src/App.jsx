import "./App.css";

import { AppBar, Button, ButtonGroup, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const rootStyles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
  },
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
            <Button sx={rootStyles.navbarButtons}>Login</Button>
            <Button sx={rootStyles.navbarButtons}>Sign Up</Button>
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
