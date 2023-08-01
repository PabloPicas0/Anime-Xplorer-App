import { useState } from "react";

import "./App.css";

import { AppBar, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

import Unregistered from "./Components/UI/UnregisteredNav";
import Registred from "./Components/UI/RegisteredNav";
import { useSelector } from "react-redux";

const rootStyles = {
  navbar: {
    justifyContent: "space-around",
    alignItems: "stretch",
    backgroundColor: "#2b2d42",
  },
};

function App() {
  const isAuthenticated = useSelector((state) => state.profile.isAuthenticated);

  return (
    <>
      <AppBar component={"nav"} id="navbar">
        <Toolbar sx={rootStyles.navbar}>
          {isAuthenticated ? <Registred /> : <Unregistered />}
        </Toolbar>
      </AppBar>

      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default App;
