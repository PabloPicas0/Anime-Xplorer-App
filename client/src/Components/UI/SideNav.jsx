import { Home, Logout, Search, Settings } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";

const icons = [
  { icon: <Home />, description: "Home" },
  { icon: <Search />, description: "Search" },
  { icon: <Settings />, description: "Settings" },
  { icon: <Logout />, description: "Logout" },
];

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
      {icons.map((iconProps) => {
        const { icon, description } = iconProps;

        return (
          <Tooltip title={description} placement="right" key={description} arrow>
            <IconButton size="large">{icon}</IconButton>
          </Tooltip>
        );
      })}
    </Box>
  );
};

export default SideNav;
