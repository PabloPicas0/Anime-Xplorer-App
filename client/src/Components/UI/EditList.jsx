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

  const handleClose = () => {
    setIsEditVisible(false);
  };

  console.table({animeName, allEpisodes, score, animeType, animeStatus});

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
            value={animeStatus}
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
            value={currentEpisode}
            MenuProps={editListStyles.menuProps}>
            {[...Array(allEpisodes + 1)].map((_, idx) => (
              <MenuItem value={idx} key={idx}>{idx}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel id="type-label">Anime Type</InputLabel>

          <Select label="Anime Type" labelId="type-label" value={animeType} MenuProps={editListStyles.menuProps}>
            <MenuItem value={"TV"}>TV</MenuItem>
            <MenuItem value={"OVA"}>OVA</MenuItem>
            <MenuItem value={"MOVIE"}>MOVIE</MenuItem>
          </Select>
        </FormControl>

        <Box sx={editListStyles.animeScoreBox}>
          <Typography>Edit score:</Typography>
          <Rating name="new-socre" value={score} />
        </Box>
      </DialogContent>

      <DialogActions sx={editListStyles.dialogActions}>
        <Button variant="contained">Submit</Button>

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
