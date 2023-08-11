import {
  Alert,
  Box,
  Button,
  FormControl,
  Grow,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Slide,
  Switch,
  Typography,
} from "@mui/material";
import Menu from "../UI/Menu";
import { useDispatch, useSelector } from "react-redux";
import url from "../Utils/api";
import { handleProfileSettings, loadUser } from "../Redux/Slices/profileSclice";
import { useEffect, useMemo, useState } from "react";
import { handleStatus } from "../Redux/Slices/statusSlice";

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
// Apply settings to profile

const Settings = () => {
  const [optionsApplied, setOptionsApplied] = useState(false);

  const profile = useSelector((state) => state.profile.profileFields);
  const isAuthenticated = useSelector(state => state.profile.isAuthenticated)
  const status = useSelector((state) => state.status);

  const options = profile.options;
  const oldOptions = useMemo(() => [...options], [optionsApplied, isAuthenticated]);

  const isDisabled = JSON.stringify(...oldOptions) === JSON.stringify(...options);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const handleSubmit = async () => {
    try {
      const req = await fetch(`${url}/api/options`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `username=${profile.username}&keepLogined=${options[0].keepLogined}&darkMode=${options[0].darkMode}&color=${options[0].color}&font=${options[0].font}&defaultListFilter=${options[0].defaultListFilter}`,
      });

      const res = await req.json();

      dispatch(
        handleStatus({
          error: res.error,
          status: res.status,
        })
      );

      if (!res.error) {
        setOptionsApplied((prev) => !prev);
      }
    } catch (error) {
      console.log(error);

      dispatch(
        handleStatus({
          error: true,
          status: [{ msg: "Something went wrong. Please refresh the page." }],
        })
      );
    }
  };

  return (
    <Box sx={settingsStyles.container}>
      {options.length < 1 ? (
        <>
          <Skeleton variant="circular" width={"100px"} height={"100px"}></Skeleton>

          <Box sx={settingsStyles.wrapper}>
            <Skeleton variant="text" height={38}></Skeleton>
            <Skeleton variant="text" height={38}></Skeleton>
            <Skeleton variant="text" height={38}></Skeleton>
            <Skeleton variant="text" height={38}></Skeleton>
            <Skeleton variant="text" height={38}></Skeleton>

            <Box sx={settingsStyles.buttons}>
              <Skeleton variant="rounded" width={78} height={36}></Skeleton>
              <Skeleton variant="rounded" width={78} height={36}></Skeleton>
            </Box>
          </Box>
        </>
      ) : (
        <>
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
                    dispatch(
                      handleProfileSettings({ optionType: "defaultListFilter", value: e.target.value })
                    )
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
              <Button
                variant="contained"
                disabled={isDisabled}
                onClick={() => dispatch(handleProfileSettings({ value: oldOptions }))}>
                Discard
              </Button>
            </Box>

            <Grow in={status.error} unmountOnExit>
              <Alert severity={status.error ? "error" : "success"}>{status.status[0].msg}</Alert>
            </Grow>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Settings;
