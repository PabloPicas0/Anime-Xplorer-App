import { useEffect } from "react";

import "./App.css";

import { AppBar, Toolbar } from "@mui/material";
import { Outlet, useLocation, useParams } from "react-router-dom";

import Unregistered from "./Components/UI/UnregisteredNav";
import Registred from "./Components/UI/RegisteredNav";

import { useDispatch, useSelector } from "react-redux";

import { loadUser } from "./Components/Redux/Slices/profileSclice";
import SideNav from "./Components/UI/SideNav";

const rootStyles = {
  toolbar: {
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

function App() {
  const isAuthenticated = useSelector((state) => state.profile.isAuthenticated);
  const profileOptions = useSelector((state) => state.profile.profileFields.options[0]);
  const { color } = profileOptions || { color: "Blue" }; // Fallback value while fetching data to prevent object destructing errors

  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;

  const { name } = useParams();

  useEffect(() => {
    dispatch(loadUser(name));
  }, [path]);

  return (
    <>
      <AppBar component={"nav"} id="navbar" sx={rootStyles[color.toLowerCase()]}>
        <Toolbar sx={{ ...rootStyles.toolbar, ...rootStyles[color.toLowerCase()] }}>
          {isAuthenticated ? <Registred /> : <Unregistered />}
        </Toolbar>
      </AppBar>

      {name && isAuthenticated ? <SideNav /> : null}

      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default App;
