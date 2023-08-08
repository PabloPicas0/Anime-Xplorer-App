import { Box, Button, FormControl, InputLabel, MenuItem, Select, Switch, Typography } from "@mui/material";
import Menu from "../UI/Menu";
import { useSelector } from "react-redux";
import url from "../Utils/api";

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
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
  setting: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
};

// Bug
// redux store become empty after page refresh

const Settings = () => {
  const profile = useSelector((state) => state.profile.profileFields);

  const handleSubmit = async () => {
    try {
      const req = await fetch(`${url}/api/options`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `username=${profile.username}&keepLogined=${true}&darkMode=false&color=White&font=Arial&defaultListFilter=Completed`,
      });

      const res = await req.json()

      console.log(res)
      console.log(profile)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={settingsStyles.container}>
      <Menu />

      <Box sx={settingsStyles.wrapper}>
        <Box sx={settingsStyles.setting}>
          <Typography>Keep logined</Typography>
          <Switch />
        </Box>

        <Box sx={settingsStyles.setting}>
          <Typography>Dark Mode</Typography>
          <Switch />
        </Box>

        <Box sx={settingsStyles.setting}>
          <Typography>Profile main color</Typography>
          <FormControl size="small" sx={{ minWidth: "180px" }}>
            <InputLabel id="select-color-label">Color</InputLabel>
            <Select labelId="select-color-label" id="select" label="color" value={""}>
              <MenuItem value={10}>White</MenuItem>
              <MenuItem value={20}>Dark</MenuItem>
              <MenuItem value={30}>Blue</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={settingsStyles.setting}>
          <Typography>Profile font</Typography>
          <FormControl size="small" sx={{ minWidth: "180px" }}>
            <InputLabel id="select-font-label">Font</InputLabel>
            <Select labelId="select-font-label" id="simple-select" label="Font" value={""}>
              <MenuItem value={10}>Arial</MenuItem>
              <MenuItem value={20}>Roboto</MenuItem>
              <MenuItem value={30}>system UI</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={settingsStyles.setting}>
          <Typography>Default List</Typography>
          <FormControl size="small" sx={{ minWidth: "180px" }}>
            <InputLabel id="select-list-label">All anime</InputLabel>
            <Select labelId="select-list-label" id="simple-list-select" label="All anime" value={""}>
              <MenuItem value={10}>All anime</MenuItem>
              <MenuItem value={20}>Currently Watching</MenuItem>
              <MenuItem value={30}>Completed</MenuItem>
              <MenuItem value={40}>Plan to watch</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={settingsStyles.buttons}>
          <Button variant="contained" onClick={() => handleSubmit()}>
            Apply
          </Button>
          <Button variant="contained" disabled>
            Discard
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
