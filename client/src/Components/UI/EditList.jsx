import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import url from "../Utils/api";
import { useState } from "react";

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

  const handleClose = () => {
    setIsEditVisible(false);
  };

  const handleEdit = async () => {
    try {
      const request = await fetch(`${url}/api/list/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: `title=${anime.animeName}&allEpisodes=${anime.allEpisodes}&currentEpisode=${anime.currentEpisode}&score=${anime.score}&animeType=${anime.animeType}&animeStatus=${anime.animeStatus}`,
      });

      const response = await request.json()

      console.log(response)

      handleClose()
    } catch (error) {
      console.log(error);
    }
  };
  console.log(anime)
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
                return { ...oldValues, animeStatus: e.target.value };
              })
            }
            MenuProps={editListStyles.menuProps}>
            <MenuItem value={"Currently watching"}>Currently watching</MenuItem>
            <MenuItem value={"Completed"}>Completed</MenuItem>
            <MenuItem value={"Plan to watch"}>Plan to watch</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel id="episodes-label">Episodes Watched</InputLabel>

          <Select
            label="Episodes Watched"
            labelId="episodes-label"
            value={anime.currentEpisode}
            onChange={(e) =>
              setAnime((oldValues) => {
                return { ...oldValues, currentEpisode: e.target.value };
              })
            }
            MenuProps={editListStyles.menuProps}>
            {[...Array(allEpisodes + 1)].map((_, idx) => (
              <MenuItem value={idx} key={idx}>
                {idx}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel id="type-label">Anime Type</InputLabel>

          <Select
            label="Anime Type"
            labelId="type-label"
            value={anime.animeType}
            onChange={(e) =>
              setAnime((oldValues) => {
                return { ...oldValues, animeType: e.target.value };
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
            onChange={(e) =>
              setAnime((oldValues) => {
                return { ...oldValues, score: e.target.value };
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
          <Button variant="contained" color="error">
            Delete
          </Button>
        </Tooltip>
      </DialogActions>
    </Dialog>
  );
};

export default EditList;
