import { Home, Logout, Search, Settings } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";

import { useSelector } from "react-redux";

const SideNav = () => {
  const darkMode = useSelector((state) => state.profile.profileFields.options[0].darkMode);
  
  return (
    <Box
      component={"aside"}
      sx={{
        position: "fixed",
        top: { xs: "auto", lg: 0 },
        bottom: 0,
        right: { xs: 0, lg: "auto" },
        left: 0,
        display: "flex",
        flexDirection: { xs: "row", lg: "column" },
        justifyContent: "center",
        gap: { xs: "30px", lg: "10px" },
        backgroundColor: { xs: darkMode ? "#121212" : "#fafafa", lg: "transparent" },
        zIndex: 1338,
      }}>
      <Tooltip title={"Home"} placement="right" arrow>
        <IconButton size="large">
          <Home />
        </IconButton>
      </Tooltip>

      <Tooltip title={"Search"} placement="right" arrow>
        <IconButton size="large">
          <Search />
        </IconButton>
      </Tooltip>

      <Tooltip title={"Settings"} placement="right" arrow>
        <IconButton size="large">
          <Settings />
        </IconButton>
      </Tooltip>

      <Tooltip title={"Logout"} placement="right" arrow>
        <IconButton size="large">
          <Logout />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default SideNav;
