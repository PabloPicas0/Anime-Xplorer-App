import { Home, Logout, Search, Settings } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { handleReset } from "../Redux/Slices/profileSclice";
import CustomSearchInput from "./CustomSearchInput";

const sideNavStyles = {
  container: {
    position: "fixed",
    top: { xs: "auto", lg: 0 },
    bottom: 0,
    right: { xs: 0, lg: "auto" },
    left: 0,
    display: "flex",
    flexDirection: { xs: "row", lg: "column" },
    justifyContent: "center",
    gap: { xs: "30px", lg: "10px" },
    zIndex: 1099,
  },
};

const SideNav = () => {
  const darkMode = useSelector((state) => state.profile.profileFields.options[0].darkMode);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(handleReset());
    navigate("/");
  };

  return (
    <Box
      component={"aside"}
      sx={{
        ...sideNavStyles.container,
        backgroundColor: { xs: darkMode ? "#121212" : "#fafafa", lg: "transparent" },
      }}>
      <div>
        <Link to={"/home"}>
          <Tooltip title={"Home"} placement="right" arrow>
            <IconButton size="large">
              <Home />
            </IconButton>
          </Tooltip>
        </Link>
      </div>

      <Box display={{ xs: "none", md: "block" }}>
        <CustomSearchInput placement={"right"} isAlwaysVisible={false} />
      </Box>

      <div>
        <Link to={"/settings"}>
          <Tooltip title={"Settings"} placement="right" arrow>
            <IconButton size="large">
              <Settings />
            </IconButton>
          </Tooltip>
        </Link>
      </div>

      <div>
        <Tooltip title={"Logout"} placement="right" arrow>
          <IconButton size="large" sx={{ justifyContent: "start" }} onClick={logout}>
            <Logout />
          </IconButton>
        </Tooltip>
      </div>
    </Box>
  );
};

export default SideNav;
