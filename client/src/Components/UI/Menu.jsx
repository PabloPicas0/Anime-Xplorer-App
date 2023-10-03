import { Person, HomeOutlined, LogoutSharp, Settings, Add, Search } from "@mui/icons-material";
import { IconButton, Tooltip, Zoom, Grow, Box } from "@mui/material";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { handleDialog, handleVisibility } from "../Redux/Slices/menuSlice";

import AddToList from "./addToList";

import { handleReset } from "../Redux/Slices/profileSclice";
import CustomSearchInput from "./CustomSearchInput";

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
  const menuVisiblity = useSelector((state) => state.menu.isVisible);
  const params = useParams();

  const isNotUserAccount = Boolean(params.name);
  const isVisible = menuVisiblity && !isNotUserAccount;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(handleReset());
    navigate("/");
  };

  return (
    <Box sx={menuStyles.menu}>
      <Box>
        {isNotUserAccount ? (
          <IconButton size="large" disabled sx={menuStyles.heroIconWrapper}>
            <Person sx={menuStyles.heroIcon} />
          </IconButton>
        ) : (
          <Tooltip TransitionComponent={Zoom} title="Open Settings" arrow>
            <IconButton
              size="large"
              disabled={Boolean(params.name)}
              sx={menuStyles.heroIconWrapper}
              onClick={() => dispatch(handleVisibility(!isVisible))}>
              <Person sx={menuStyles.heroIcon} />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Box sx={menuStyles.options}>
        <Box sx={{ display: "flex" }} style={isVisible ? {} : { pointerEvents: "none" }}>
          <Link to={"/home"} tabIndex={isVisible ? 0 : -1}>
            <Grow in={isVisible}>
              <Tooltip TransitionComponent={Zoom} title="Home" arrow>
                <IconButton size="large" sx={menuStyles.homeIcon}>
                  <HomeOutlined />
                </IconButton>
              </Tooltip>
            </Grow>
          </Link>

          <Grow in={isVisible}>
            <div>
              <CustomSearchInput />
            </div>
          </Grow>
        </Box>

        <Box id="options" style={isVisible ? {} : { pointerEvents: "none" }}>
          <Grow in={isVisible}>
            <Tooltip TransitionComponent={Zoom} title="Add to list" arrow>
              <IconButton size="large" onClick={() => dispatch(handleDialog(true))}>
                <Add />
              </IconButton>
            </Tooltip>
          </Grow>

          <Link to={"/settings"} tabIndex={isVisible ? 0 : -1}>
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
              <IconButton size="large" onClick={logout}>
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
