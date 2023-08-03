import { Person, HomeOutlined, LogoutSharp, Settings, Add } from "@mui/icons-material";
import { IconButton, Tooltip, Zoom, Grow, Box } from "@mui/material";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { handleDialog, handleVisibility } from "../Redux/Slices/menuSlice";

import AddToList from "./AddToList";

const menuStyles = {
  menu: {
    display: "flex",
    gap: "10px",
  },
  heroIconWrapper: {
    border: "2px solid #d9dbdf",
  },
  heroIcon: {
    width: "100px",
    height: "100px",
  },
  homeIcon: {
    justifyContent: "start",
  },
  options: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
};

const Menu = () => {
  const isVisible = useSelector((state) => state.menu.isVisible);

  const dispatch = useDispatch();

  return (
    <Box sx={menuStyles.menu}>
      <Box>
        <Tooltip TransitionComponent={Zoom} title="Open Settings" arrow>
          <IconButton
            size="large"
            sx={menuStyles.heroIconWrapper}
            onClick={() => dispatch(handleVisibility(!isVisible))}>
            <Person sx={menuStyles.heroIcon} />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={menuStyles.options}>
        <Box style={isVisible ? {} : { pointerEvents: "none" }}>
          <Link to={"/home"}>
            <Grow in={isVisible}>
              <Tooltip TransitionComponent={Zoom} title="Home" arrow>
                <IconButton size="large" sx={menuStyles.homeIcon}>
                  <HomeOutlined />
                </IconButton>
              </Tooltip>
            </Grow>
          </Link>
        </Box>

        <Box id="options" style={isVisible ? {} : { pointerEvents: "none" }}>
          <Grow in={isVisible}>
            <Tooltip TransitionComponent={Zoom} title="Add to list" arrow>
              <IconButton size="large" onClick={() => dispatch(handleDialog(true))}>
                <Add />
              </IconButton>
            </Tooltip>
          </Grow>

          <Link to={"/settings"}>
            <Grow in={isVisible} {...(isVisible ? { timeout: 500 } : {})}>
              <Tooltip TransitionComponent={Zoom} title="Account settings" arrow>
                <IconButton size="large">
                  <Settings />
                </IconButton>
              </Tooltip>
            </Grow>
          </Link>

          <Grow in={isVisible} {...(isVisible ? { timeout: 550 } : {})}>
            <Tooltip TransitionComponent={Zoom} title="Logout" arrow>
              <IconButton size="large">
                <LogoutSharp />
              </IconButton>
            </Tooltip>
          </Grow>
        </Box>
      </Box>

      <AddToList />
    </Box>
  );
};

export default Menu;
