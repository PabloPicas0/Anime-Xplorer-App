import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";

import url from "../Utils/api";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { handleError } from "../Redux/Slices/statusSlice";
import { handleClientList } from "../Redux/Slices/profileSclice";
import useErrorHandler from "../Utils/useErrorHandler";

import PropTypes from "prop-types";

const editListStyles = {
  dialogBody: {
    style: {
      width: "100%",
    },
  },
  animeNameBox: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "8px",
    marginBottom: "4px",
  },
  menuProps: {
    marginThreshold: 10,
  },
  animeScoreBox: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "8px",
  },
  dialogActions: {
    justifyContent: "center",
  },
};

const EditList = (props) => {
  const {
    isEditVisible,
    setIsEditVisible,
    animeName,
    allEpisodes,
    currentEpisode,
    score,
    animeType,
    animeStatus,
  } = props;

  const [anime, setAnime] = useState({
    animeName,
    allEpisodes,
    currentEpisode,
    score,
    animeType,
    animeStatus,
  });

  const dispatch = useDispatch();
  const errorHandler = useErrorHandler();

  // This line compares props with current state
  const stateIsDifferent =
    JSON.stringify({
      animeName,
      allEpisodes,
      currentEpisode,
      score,
      animeType,
      animeStatus,
    }) !== JSON.stringify(anime);

  // Keeps in sync props and state when user change episode oustside EditList
  if (stateIsDifferent && !isEditVisible) {
    setAnime((oldValues) => {
      return { ...oldValues, currentEpisode };
    });
  }

  const handleClose = () => {
    if (stateIsDifferent) {
      setAnime((oldValues) => {
        return { ...oldValues, currentEpisode, score, animeType, animeStatus };
      });
    }
    setIsEditVisible(false);
  };

  const handleEdit = async () => {
    if (!stateIsDifferent) return;

    try {
      const request = await fetch(`${url}/api/list/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: `title=${animeName}&allEpisodes=${anime.allEpisodes}&currentEpisode=${anime.currentEpisode > allEpisodes ? allEpisodes : anime.currentEpisode}&score=${anime.score}&animeType=${anime.animeType}&animeStatus=${anime.animeStatus}`,
      });

      const response = await request.json();

      console.log(response);

      errorHandler(response);

      if (!response.error) {
        dispatch(handleClientList({ type: "editList", data: response.list }));
        setIsEditVisible(false);
      }
    } catch (error) {
      console.log(error);

      dispatch(
        handleError({
          error: true,
          errorMessage: [{ msg: "Something went wrong. Please try again later." }],
        })
      );
    }
  };

  const handleDelete = async () => {
    try {
      const request = await fetch(`${url}/api/list/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: `title=${animeName}`,
      });

      const response = await request.json();

      console.log(response);

      errorHandler(response);

      if (!response.error) {
        dispatch(handleClientList({ type: "deleteTitle", data: animeName }));
        setIsEditVisible(false);
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
  // console.log(typeof allEpisodes);
  // console.table({animeName, allEpisodes, score, animeType, animeStatus});

  return (
    <Dialog
      onClose={handleClose}
      open={isEditVisible}
      PaperProps={editListStyles.dialogBody}
      disableScrollLock>
      <DialogTitle textAlign={"center"}>Edit Anime</DialogTitle>

      <DialogContent>
        <Box sx={editListStyles.animeNameBox}>
          <Typography>Anime title:</Typography>
          <Typography fontWeight={600}>{animeName}</Typography>
        </Box>

        <FormControl fullWidth margin="dense">
          <InputLabel id="select-label">Status</InputLabel>

          <Select
            label="Status"
            labelId="select-label"
            value={anime.animeStatus}
            onChange={(e) =>
              setAnime((oldValues) => {
                const newValues = { ...oldValues };
                newValues.animeStatus = e.target.value;

                return newValues;
              })
            }
            MenuProps={editListStyles.menuProps}>
            <MenuItem value={"Currently watching"}>Currently watching</MenuItem>
            <MenuItem value={"Completed"}>Completed</MenuItem>
            <MenuItem value={"Plan to watch"}>Plan to watch</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Episodes Watched"
          value={anime.currentEpisode}
          type="number"
          fullWidth
          margin="dense"
          InputProps={{
            inputProps: {
              min: 0,
              max: allEpisodes,
            },
            endAdornment: (
              <InputAdornment position="end" disablePointerEvents>
                / {allEpisodes}
              </InputAdornment>
            ),
          }}
          onChange={(e) =>
            setAnime((oldValues) => {
              const newValues = { ...oldValues };
              const { valueAsNumber } = e.target;

              newValues.currentEpisode = valueAsNumber;

              return newValues;
            })
          }
        />

        <FormControl fullWidth margin="dense">
          <InputLabel id="type-label">Anime Type</InputLabel>

          <Select
            label="Anime Type"
            labelId="type-label"
            value={anime.animeType}
            onChange={(e) =>
              setAnime((oldValues) => {
                const newValues = { ...oldValues };
                newValues.animeType = e.target.value;

                return newValues;
              })
            }
            MenuProps={editListStyles.menuProps}>
            <MenuItem value={"TV"}>TV</MenuItem>
            <MenuItem value={"OVA"}>OVA</MenuItem>
            <MenuItem value={"MOVIE"}>MOVIE</MenuItem>
          </Select>
        </FormControl>

        <Box sx={editListStyles.animeScoreBox}>
          <Typography>Edit score:</Typography>
          <Rating
            name="new-socre"
            value={anime.score}
            onChange={(e, newValue) =>
              setAnime((oldValues) => {
                const newValues = { ...oldValues };
                newValues.score = newValue;

                return newValues;
              })
            }
          />
        </Box>
      </DialogContent>

      <DialogActions sx={editListStyles.dialogActions}>
        <Button variant="contained" onClick={handleEdit}>
          Submit
        </Button>

        <Tooltip title="Delete anime from your list" arrow placement="top" TransitionComponent={Zoom}>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Tooltip>
      </DialogActions>
    </Dialog>
  );
};

EditList.propTypes = {
  isEditVisible: PropTypes.bool,
  setIsEditVisible: PropTypes.any,
  animeName: PropTypes.string,
  animeStatus: PropTypes.string,
  currentEpisode: PropTypes.number,
  allEpisodes: PropTypes.number,
  score: PropTypes.number,
  animeType: PropTypes.string,
};

export default EditList;
