import { Home, Logout, Search, Settings } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

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
        gap: "10px"
      }}>
      <IconButton size="large">
        <Home />
      </IconButton>

      <IconButton size="large">
        <Search />
      </IconButton>

      <IconButton size="large">
        <Settings />
      </IconButton>

      <IconButton size="large">
        <Logout />
      </IconButton>
    </Box>
  );
};

export default SideNav;
