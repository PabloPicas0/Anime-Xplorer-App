import { useState } from "react";

import "./App.css";

import { AppBar, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

import Unregistered from "./Components/UI/UnregisteredNav";
import Registred from "./Components/UI/RegisteredNav";

const rootStyles = {
  navbar: {
    justifyContent: "space-around",
    alignItems: "stretch",
    backgroundColor: "#2b2d42",
  },
};

function App() {
  const [isRegistered, setIsRegistered] = useState(true);

  return (
    <>
      <AppBar component={"nav"} id="navbar">
        <Toolbar sx={rootStyles.navbar}>
          <Typography variant="h6" component={"div"} alignSelf={"center"}>
            AnimeExplorer
          </Typography>

          {isRegistered ? <Registred /> : <Unregistered />}
        </Toolbar>
      </AppBar>

      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default App;
