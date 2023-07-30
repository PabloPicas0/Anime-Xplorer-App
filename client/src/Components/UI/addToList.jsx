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
} from "@mui/material";

import { handleDialog } from "../Redux/Slices/menuSlice";
import { handleClientList } from "../Redux/Slices/profileSclice";

import url from "../Utils/api";

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
};

const AddToList = () => {
  const [dialogValues, setDialogValues] = useState({
    title: "",
    status: "Plan to watch",
    watchedEp: 0,
    allEp: 0,
    score: 0,
  });
  const username = useSelector((state) => state.profile.profileFields.username);
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
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      onClose={() => handleClose()}
      open={openDialog}
      PaperProps={{ style: addToListStyles.dialogBody }}
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
        <Button variant="contained" fullWidth type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddToList;