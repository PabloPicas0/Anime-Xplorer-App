import { Box, FormControl, InputLabel, MenuItem, Select, Switch, Typography } from "@mui/material";
import Menu from "../UI/Menu";

const settingsStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "6rem",
    margin: "0px auto 0px auto", // margin due to 64px height of navbar to prevent stacking
    maxWidth: "1024px",
    padding: "3rem 10px",
    minHeight: "100vh",
  },
};

const Settings = () => {
  return (
    <Box sx={settingsStyles.container}>
      <Menu />

      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>Keep logined</Typography>
          <Switch />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>Profile main color</Typography>
          <FormControl size="small" sx={{ minWidth: "180px" }}>
            <InputLabel id="demo-simple-select-label">Color</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" label="color">
              <MenuItem value={10}>White</MenuItem>
              <MenuItem value={20}>Dark</MenuItem>
              <MenuItem value={30}>Blue</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>Profile font</Typography>
          <FormControl size="small" sx={{ minWidth: "180px" }}>
            <InputLabel id="demo-simple-select-label">Font</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Font">
              <MenuItem value={10}>Arial</MenuItem>
              <MenuItem value={20}>Roboto</MenuItem>
              <MenuItem value={30}>system UI</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>Default List</Typography>
          <FormControl size="small" sx={{ minWidth: "180px" }}>
            <InputLabel id="demo-simple-select-label">All anime</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Filter">
              <MenuItem value={10}>All anime</MenuItem>
              <MenuItem value={20}>Currently Watchin</MenuItem>
              <MenuItem value={30}>Completed</MenuItem>
              <MenuItem value={40}>Plan to watch</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
