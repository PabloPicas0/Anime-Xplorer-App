import { Person, HomeOutlined, LogoutSharp, Settings, Add } from "@mui/icons-material";
import {
  IconButton,
  Tooltip,
  Zoom,
  Grow,
  Box,
  Dialog,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Rating,
  Button,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { useState } from "react";
import { Link } from "react-router-dom";
import url from "../Utils/api";
import { useDispatch, useSelector } from "react-redux";
import { handleClientList } from "../Redux/Slices/profileSclice";
import { handleDialog, handleVisibility } from "../Redux/Slices/menuSlice";

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
  dialogBody: {
    width: "100%",
  },
  score: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    gap: "10px",
    marginTop: "20px",
  },
};

const Menu = () => {
  const [dialogValues, setDialogValues] = useState({
    title: "",
    status: "Plan to watch",
    watchedEp: 0,
    allEp: 0,
    score: 0,
  });

  const username = useSelector((state) => state.profile.profileFields.username);
  const isVisible = useSelector((state) => state.menu.isVisible);
  const openDialog = useSelector((state) => state.menu.openDialog);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(handleDialog(false));
    setDialogValues({
      title: "",
      status: "Plan to watch",
      watchedEp: 0,
      allEp: 0,
      score: 0,
    });
  };

  // TODO
  // Form is subbmited with empty fields
  const handleSubmit = async () => {
    console.log(username);
    try {
      const request = await fetch(`${url}/api/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `username=${username}&type=${"ova"}&title=${dialogValues.title}&status=${
          dialogValues.status
        }&currentEp=${dialogValues.watchedEp}&allEp=${dialogValues.allEp}&score=${dialogValues.score}`,
      });

      const response = await request.json();

      console.log(response);

      dispatch(handleClientList(response.list));
      dispatch(handleDialog(false));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={menuStyles.menu}>
      <Box>
        <Tooltip TransitionComponent={Zoom} title="Open Settings" arrow>
          <IconButton
            size="large"
            sx={menuStyles.heroIconWrapper}
            onClick={() => dispatch(handleVisibility(!isVisible))}>
            <Person sx={menuStyles.heroIcon} />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={menuStyles.options}>
        <Box style={isVisible ? {} : { pointerEvents: "none" }}>
          <Link to={"/home"}>
            <Grow in={isVisible}>
              <Tooltip TransitionComponent={Zoom} title="Home" arrow>
                <IconButton size="large" sx={menuStyles.homeIcon}>
                  <HomeOutlined />
                </IconButton>
              </Tooltip>
            </Grow>
          </Link>
        </Box>

        <Box id="options" style={isVisible ? {} : { pointerEvents: "none" }}>
          <Grow in={isVisible}>
            <Tooltip TransitionComponent={Zoom} title="Add to list" arrow>
              <IconButton size="large" onClick={() => dispatch(handleDialog(true))}>
                <Add />
              </IconButton>
            </Tooltip>
          </Grow>

          <Link to={"/settings"}>
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
              <IconButton size="large">
                <LogoutSharp />
              </IconButton>
            </Tooltip>
          </Grow>
        </Box>
      </Box>

      <Dialog
        onClose={() => handleClose()}
        open={openDialog}
        PaperProps={{ style: menuStyles.dialogBody }}
        disableScrollLock>
        <DialogTitle textAlign={"center"}>Add to list</DialogTitle>

        <DialogContent>
          <TextField
            label="Anime title"
            required
            margin="dense"
            fullWidth
            value={dialogValues.title}
            onChange={(e) =>
              setDialogValues((oldValues) => {
                const newValues = { ...oldValues };
                newValues.title = e.target.value;

                return newValues;
              })
            }
          />

          <FormControl fullWidth margin="dense">
            <InputLabel id="select-label">Status</InputLabel>

            <Select
              label="Status"
              labelId="select-label"
              value={dialogValues.status}
              MenuProps={{
                marginThreshold: 10,
              }}
              onChange={(e) =>
                setDialogValues((oldValues) => {
                  const newValues = { ...oldValues };
                  newValues.status = e.target.value;

                  return newValues;
                })
              }>
              <MenuItem value={"Currently watching"}>Currently watching</MenuItem>
              <MenuItem value={"Completed"}>Completed</MenuItem>
              <MenuItem value={"Plan to watch"}>Plan to watch</MenuItem>
            </Select>
          </FormControl>

          <TextField
            type="number"
            label="Episodes watched"
            margin="dense"
            fullWidth
            inputProps={{ min: 0 }}
            onChange={(e) =>
              setDialogValues((oldValues) => {
                const newValues = { ...oldValues };
                newValues.watchedEp = e.target.value;

                return newValues;
              })
            }
          />

          <TextField
            type="number"
            label="All episodes"
            margin="dense"
            fullWidth
            inputProps={{ min: 0 }}
            required
            onChange={(e) =>
              setDialogValues((oldValues) => {
                const newValues = { ...oldValues };
                newValues.allEp = e.target.value;

                return newValues;
              })
            }
          />

          <Box sx={menuStyles.score}>
            <Typography>Your score:</Typography>
            <Rating
              name="anime-rating"
              value={dialogValues.score}
              onChange={(e, newValue) => {
                setDialogValues((oldValues) => {
                  const newValues = { ...oldValues };
                  newValues.score = newValue;

                  return newValues;
                });
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" fullWidth type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Menu;
