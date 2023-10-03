import { Home, Logout, Search, Settings } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";

const SideNav = () => {
  return (
    <Box
      component={"aside"}
      sx={{
        position: "fixed",
        top: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "10px",
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
