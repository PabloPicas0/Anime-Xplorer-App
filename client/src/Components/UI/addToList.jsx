import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
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
  Box,
  Slide,
  Alert,
} from "@mui/material";

import { handleDialog } from "../Redux/Slices/menuSlice";
import { handleClientList } from "../Redux/Slices/profileSclice";

import url from "../Utils/api";
import { handleError } from "../Redux/Slices/statusSlice";
import { useLocation } from "react-router-dom";

const addToListStyles = {
  dialogBody: {
    width: "100%",
  },
  score: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    gap: "10px",
    marginTop: "20px",
  },
  alert: {
    borderRadius: 0,
  },
};

const AddToList = () => {
  const [dialogValues, setDialogValues] = useState({
    title: "",
    type: "TV",
    status: "Plan to watch",
    watchedEp: 0,
    allEp: 0,
    score: 0,
  });

  const username = useSelector((state) => state.profile.profileFields.username);
  const openDialog = useSelector((state) => state.menu.openDialog);
  const status = useSelector((state) => state.status);

  const { pathname } = useLocation();

  const isSettings = pathname === "/settings";

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(handleDialog(false));
    dispatch(
      handleError({
        error: false,
        errorMessage: [{ msg: "" }],
      })
    );
    setDialogValues({
      title: "",
      type: "TV",
      status: "Plan to watch",
      watchedEp: 0,
      allEp: 0,
      score: 0,
    });
  };

  const handleSubmit = async () => {
    try {
      const request = await fetch(`${url}/api/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: `username=${username}&type=${dialogValues.type}&title=${dialogValues.title}&status=${dialogValues.status}&currentEp=${dialogValues.watchedEp}&allEp=${dialogValues.allEp}&score=${dialogValues.score}`,
      });

      const response = await request.json();

      console.log(response);

      dispatch(
        handleError({
          error: response.error,
          errorMessage: response.status,
        })
      );

      if (!response.error) {
        dispatch(handleClientList(response.list));
        handleClose();
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

  // Blocking addToList while user is in settings is needed
  // Settings and addToList use same redux state blocking this component prevent from dubble error display
  return (
    <Dialog
      onClose={() => handleClose()}
      open={openDialog}
      PaperProps={{ style: addToListStyles.dialogBody }}
      disableScrollLock>
      <Slide direction="down" in={status.error || isSettings} unmountOnExit timeout={0}>
        <Alert severity={status.error || isSettings ? "error" : "success"} sx={addToListStyles.alert}>
          {" "}
          {status.errorMessage[0].msg}
          {isSettings ? "Cannot add to list while in settings. Please visit home page." : null}
        </Alert>
      </Slide>

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
          <InputLabel id="type-label">Anime Type</InputLabel>

          <Select
            label="Anime Type"
            labelId="type-label"
            value={dialogValues.type}
            MenuProps={{
              marginThreshold: 10,
            }}
            onChange={(e) =>
              setDialogValues((oldValues) => {
                const newValues = { ...oldValues };
                newValues.type = e.target.value;

                return newValues;
              })
            }>
            <MenuItem value={"TV"}>TV</MenuItem>
            <MenuItem value={"OVA"}>OVA</MenuItem>
            <MenuItem value={"MOVIE"}>MOVIE</MenuItem>
          </Select>
        </FormControl>

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

        <Box sx={addToListStyles.score}>
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
        <Button variant="contained" fullWidth type="submit" onClick={handleSubmit} disabled={isSettings}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddToList;
