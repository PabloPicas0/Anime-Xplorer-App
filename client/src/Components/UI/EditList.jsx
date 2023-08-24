import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { handleEditDialog } from "../Redux/Slices/menuSlice";

// REMINDER
// This component is rigth now in in home component
// Change his place to card component when you done with it

// TODO
// Find a way to render menu items dynamicly based on max episodes of card

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
  const isEditVisible = useSelector((state) => state.menu.openEditDialog);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(handleEditDialog(false));
  };

  return (
    <Dialog
      onClose={handleClose}
      open={isEditVisible}
      PaperProps={editListStyles.dialogBody}
      disableScrollLock>
      <DialogTitle textAlign={"center"}>Edit Anime</DialogTitle>

      <DialogContent>
        <Box sx={editListStyles.animeNameBox}>
          <Typography>Anime name:</Typography>
          <Typography>Name</Typography>
        </Box>

        <FormControl fullWidth margin="dense">
          <InputLabel id="select-label">Status</InputLabel>

          <Select label="Status" labelId="select-label" value={0} MenuProps={editListStyles.menuProps}>
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
            value={0}
            MenuProps={editListStyles.menuProps}>
            <MenuItem value={"Currently watching"}>Currently watching</MenuItem>
            <MenuItem value={"Completed"}>Completed</MenuItem>
            <MenuItem value={"Plan to watch"}>Plan to watch</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel id="type-label">Anime Type</InputLabel>

          <Select label="Anime Type" labelId="type-label" value={0} MenuProps={editListStyles.menuProps}>
            <MenuItem value={"TV"}>TV</MenuItem>
            <MenuItem value={"OVA"}>OVA</MenuItem>
            <MenuItem value={"MOVIE"}>MOVIE</MenuItem>
          </Select>
        </FormControl>

        <Box sx={editListStyles.animeScoreBox}>
          <Typography>Edit score:</Typography>
          <Rating name="new-socre" value={5} />
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
