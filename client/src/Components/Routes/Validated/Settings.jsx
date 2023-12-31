import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Snackbar,
  Switch,
  Typography,
  Zoom,
} from "@mui/material";
import Menu from "../../UI/Menu";

import { useDispatch, useSelector } from "react-redux";
import { handleAuthentication, handleProfileSettings, loadUser } from "../../Redux/Slices/profileSclice";
import { handleError } from "../../Redux/Slices/statusSlice";

import url from "../../Utils/api";

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const settingsStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "6rem",
    margin: "0px auto 0px auto",
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
  dangerZoneWrapper: {
    border: "1px groove red",
  },
  dangerZoneLegend: {
    fontSize: "1.3rem",
  },
  deleteAccountWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
  },
  deleteAccountHeading: {
    fontSize: "1.2rem",
    fontWeight: 500,
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
};

const Settings = () => {
  const [optionsApplied, setOptionsApplied] = useState(false);

  const profile = useSelector((state) => state.profile.profileFields);
  const isAuthenticated = useSelector((state) => state.profile.isAuthenticated);
  const status = useSelector((state) => state.status);

  const options = profile.options;
  const oldOptions = useMemo(() => [...options], [optionsApplied, isAuthenticated]);

  const isOptionSame = JSON.stringify(...oldOptions) === JSON.stringify(...options);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const handleClose = () => {
    dispatch(
      handleError({
        error: false,
        errorMessage: status.errorMessage,
      })
    );
  };

  const handleSubmit = async () => {
    try {
      const req = await fetch(`${url}/api/options`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: `username=${profile.username}&keepLogined=${options[0].keepLogined}&darkMode=${options[0].darkMode}&color=${options[0].color}&font=${options[0].font}&defaultListFilter=${options[0].defaultListFilter}`,
      });

      const res = await req.json();

      dispatch(
        handleError({
          error: res.error,
          errorMessage: res.status,
        })
      );

      if (!res.error) {
        setOptionsApplied((prev) => !prev);
      }
    } catch (error) {
      console.log(error);

      dispatch(
        handleError({
          error: true,
          errorMessage: [{ msg: "Something went wrong. Please refresh the page." }],
        })
      );
    }
  };

  const handleDeleteAccount = async () => {
    const userConfirmed = confirm(
      "This process irreversible. Are you sure you want to delete your account ?"
    );

    if (!userConfirmed) return;

    try {
      const request = await fetch(`${url}/api/users`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const response = await request.json();

      console.log(response);

      if (!response.error) {
        localStorage.removeItem("token");
        dispatch(handleAuthentication(response.isAuthenticated));
        navigate("/");
      }
    } catch (error) {
      console.error(error);

      dispatch(
        handleError({
          error: true,
          errorMessage: [{ msg: "Something went wrong. Please try again later." }],
        })
      );
    }
  };

  return (
    <Box sx={settingsStyles.container}>
      {options.length < 1 ? (
        <>
          <Dialog open={status.refreshError} transitionDuration={0}>
            <DialogContent>
              <DialogContentText>{status.errorMessage[0].msg}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  navigate("/login");
                }}>
                Login
              </Button>
              <Button
                onClick={() => {
                  navigate("/signup");
                }}>
                Sign up
              </Button>
            </DialogActions>
          </Dialog>

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
          <Snackbar
            open={status.error}
            onClose={handleClose}
            autoHideDuration={4000}
            TransitionComponent={Zoom}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
            <Alert severity="error" onClose={handleClose}>
              {status.errorMessage[0].msg}
            </Alert>
          </Snackbar>

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
                  <MenuItem value={"Black"}>Black</MenuItem>
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
                  <MenuItem value={"Inter"}>Inter</MenuItem>
                  <MenuItem value={"Times New Roman"}>Times New Roman</MenuItem>
                  <MenuItem value={"Arial"}>Arial</MenuItem>
                  <MenuItem value={"monospace"}>Monospace</MenuItem>
                  <MenuItem value={"fantasy"}>Fantasy</MenuItem>
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
                  <MenuItem value={"Currently watching"}>Currently watching</MenuItem>
                  <MenuItem value={"Completed"}>Completed</MenuItem>
                  <MenuItem value={"Plan to watch"}>Plan to watch</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box>
              <fieldset style={settingsStyles.dangerZoneWrapper}>
                <legend style={settingsStyles.dangerZoneLegend}>Danger Zone</legend>

                <Box sx={settingsStyles.deleteAccountWrapper}>
                  <Typography sx={settingsStyles.deleteAccountHeading}>Delete Account</Typography>
                  <Button variant="contained" color="error" onClick={handleDeleteAccount}>
                    Delete your account
                  </Button>
                </Box>
              </fieldset>
            </Box>

            <Box sx={settingsStyles.buttons}>
              <Button variant="contained" onClick={() => handleSubmit()} disabled={isOptionSame}>
                Apply
              </Button>
              <Button
                variant="contained"
                color="error"
                disabled={isOptionSame}
                onClick={() => dispatch(handleProfileSettings({ value: oldOptions }))}>
                Discard
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Settings;
