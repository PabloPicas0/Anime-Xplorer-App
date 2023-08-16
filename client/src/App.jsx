import { useEffect } from "react";

import "./App.css";

import { AppBar, Toolbar } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";

import Unregistered from "./Components/UI/UnregisteredNav";
import Registred from "./Components/UI/RegisteredNav";

import { useDispatch, useSelector } from "react-redux";

import { loadUser } from "./Components/Redux/Slices/profileSclice";

const rootStyles = {
  navbar: {
    justifyContent: "space-around",
    alignItems: "stretch",
  },
  blue: {
    backgroundColor: "#2b2d42",
  },
  black: {
    backgroundColor: "#000",
  },
  white: {
    backgroundColor: "#fff",
    "& button": {
      color: "black",
    },
  },
};
// TODO
// add shadow on white nav background

function App() {
  const isAuthenticated = useSelector((state) => state.profile.isAuthenticated);
  const profileOptions = useSelector((state) => state.profile.profileFields.options[0]);
  const { color } = profileOptions || { color: "Blue" }; // Fallback value while fetching data to prevent object destructing errors

  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname

  useEffect(() => {
    dispatch(loadUser());
  }, [path]);

  return (
    <>
      <AppBar component={"nav"} id="navbar">
        <Toolbar sx={{ ...rootStyles.navbar, ...rootStyles[color.toLowerCase()] }}>
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
