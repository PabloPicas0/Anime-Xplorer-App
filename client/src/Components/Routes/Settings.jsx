import { Box, Button, FormControl, InputLabel, MenuItem, Select, Switch, Typography } from "@mui/material";
import Menu from "../UI/Menu";
import { useDispatch, useSelector } from "react-redux";
import url from "../Utils/api";
import { handleProfileSettings } from "../Redux/Slices/profileSclice";
import { useMemo, useState } from "react";

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
  const options = profile.options;

  const oldOptions = useMemo(() => [...options], []);

  const isDisabled = JSON.stringify(...oldOptions) === JSON.stringify(...options);

  const dispatch = useDispatch();

  // console.log(options);
  // console.log(oldOptions);

  const handleSubmit = async () => {
    try {
      const req = await fetch(`${url}/api/options`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `username=${
          profile.username
        }&keepLogined=${true}&darkMode=false&color=White&font=Arial&defaultListFilter=Completed`,
      });

      const res = await req.json();

      console.log(res);
      console.log(profile);
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
          <Switch
            checked={options[0].keepLogined}
            onChange={(e) =>
              dispatch(handleProfileSettings({ optionType: "keepLogined", value: e.target.checked }))
            }
          />
        </Box>

        <Box sx={settingsStyles.setting}>
          <Typography>Dark Mode</Typography>
          <Switch
            checked={options[0].darkMode}
            onChange={(e) =>
              dispatch(handleProfileSettings({ optionType: "darkMode", value: e.target.checked }))
            }
          />
        </Box>

        <Box sx={settingsStyles.setting}>
          <Typography>Profile main color</Typography>
          <FormControl size="small" sx={{ minWidth: "180px" }}>
            <InputLabel id="select-color-label">Color</InputLabel>
            <Select
              labelId="select-color-label"
              id="select"
              label="color"
              value={options[0].color}
              onChange={(e) =>
                dispatch(handleProfileSettings({ optionType: "color", value: e.target.value }))
              }>
              <MenuItem value={"White"}>White</MenuItem>
              <MenuItem value={"Dark"}>Dark</MenuItem>
              <MenuItem value={"Blue"}>Blue</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={settingsStyles.setting}>
          <Typography>Profile font</Typography>
          <FormControl size="small" sx={{ minWidth: "180px" }}>
            <InputLabel id="select-font-label">Profile font</InputLabel>
            <Select
              labelId="select-font-label"
              id="simple-select"
              label="Profile font"
              value={options[0].font}
              onChange={(e) =>
                dispatch(handleProfileSettings({ optionType: "font", value: e.target.value }))
              }>
              <MenuItem value={"Arial"}>Arial</MenuItem>
              <MenuItem value={"Roboto"}>Roboto</MenuItem>
              <MenuItem value={"system UI"}>system UI</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={settingsStyles.setting}>
          <Typography>Default List</Typography>
          <FormControl size="small" sx={{ minWidth: "180px" }}>
            <InputLabel id="select-list-label">Default List</InputLabel>
            <Select
              labelId="select-list-label"
              id="simple-list-select"
              label="Default List"
              value={options[0].defaultListFilter}
              onChange={(e) =>
                dispatch(handleProfileSettings({ optionType: "defaultListFilter", value: e.target.value }))
              }>
              <MenuItem value={"All anime"}>All anime</MenuItem>
              <MenuItem value={"Currently Watching"}>Currently Watching</MenuItem>
              <MenuItem value={"Completed"}>Completed</MenuItem>
              <MenuItem value={"Plan to watch"}>Plan to watch</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={settingsStyles.buttons}>
          <Button variant="contained" onClick={() => handleSubmit()} disabled={isDisabled}>
            Apply
          </Button>
          <Button variant="contained" disabled={isDisabled}>
            Discard
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
