import { useEffect } from "react";

import "./App.css";

import { AppBar, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import Unregistered from "./Components/UI/UnregisteredNav";
import Registred from "./Components/UI/RegisteredNav";

import { useDispatch, useSelector } from "react-redux";

import { loadUser } from "./Components/Redux/Slices/profileSclice";

const rootStyles = {
  navbar: {
    justifyContent: "space-around",
    alignItems: "stretch",
    backgroundColor: "#2b2d42",
  },
};
// TODO
// When user is registed there is no logo site
function App() {
  const isAuthenticated = useSelector((state) => state.profile.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <>
      <AppBar component={"nav"} id="navbar">
        <Toolbar sx={rootStyles.navbar}>{isAuthenticated ? <Registred /> : <Unregistered />}</Toolbar>
      </AppBar>

      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default App;
