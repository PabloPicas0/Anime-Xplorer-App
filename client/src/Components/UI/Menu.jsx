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
} from "@mui/material";

import { useState } from "react";
import { Link } from "react-router-dom";

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
    padding: "20px",
  },
  score: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },
  submitBtn: {
    marginTop: "20px"
  }
};

const Menu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Plan to watch");

  return (
    <Box sx={menuStyles.menu}>
      <Box>
        <Tooltip TransitionComponent={Zoom} title="Open Settings" arrow>
          <IconButton
            size="large"
            sx={menuStyles.heroIconWrapper}
            onClick={() => setIsVisible((prev) => !prev)}>
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
              <IconButton size="large" onClick={() => setOpenDialog(true)}>
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
        onClose={() => setOpenDialog(false)}
        open={openDialog}
        PaperProps={{ style: menuStyles.dialogBody }}>
        <DialogTitle textAlign={"center"}>Add to list</DialogTitle>

        <TextField label="Anime title" required margin="dense" />

        <FormControl fullWidth margin="dense">
          <InputLabel id="select-label">Status</InputLabel>

          <Select
            label="Status"
            labelId="select-label"
            value={selectedValue}
            MenuProps={{
              marginThreshold: 10,
            }}
            onChange={(e) => setSelectedValue(e.target.value)}>
            <MenuItem value={"Currently watching"}>Currently watching</MenuItem>
            <MenuItem value={"Completed"}>Completed</MenuItem>
            <MenuItem value={"Plan to watch"}>Plan to watch</MenuItem>
          </Select>
        </FormControl>

        <TextField type="number" label="Episodes watched" margin="dense" />

        <TextField type="number" label="All episodes" margin="dense" />

        <Box sx={menuStyles.score}>
          <Typography>Your score:</Typography>
          <Rating name="anime-rating" value={null} />
        </Box>

        <Button variant="contained" sx={menuStyles.submitBtn}>Submit</Button>
      </Dialog>
    </Box>
  );
};

export default Menu;
