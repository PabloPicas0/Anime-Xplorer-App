import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Snackbar,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { BarChartSharp, FilterAlt, FilterList } from "@mui/icons-material";

import Card from "../UI/Card";
import Menu from "../UI/Menu";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { handleUserSortingStatus } from "../Redux/Slices/profileSclice";
import { handleError } from "../Redux/Slices/statusSlice";
import EditList from "../UI/EditList";

const homeStyles = {
  container: {
    margin: "64px auto 0px auto", // margin due to 64px height of navbar to prevent stacking
    maxWidth: "1024px",
    padding: "3rem 10px",
    minHeight: "calc(100vh - 64px)",
  },
  filters: {
    textAlign: "end",
    margin: "20px 0px",
  },
  selectForm: {
    display: { xs: "inline-flex", md: "none" },
    marginTop: "30px",
  },
  listStyle: {
    marginBottom: "7rem",
  },
  backdrop: {
    backdrop: {
      style: {
        backdropFilter: "blur(100px)",
        transitionDuration: 0,
      },
    },
  },
};

const filterIcons = [
  {
    description: "Statistic",
    icon: <BarChartSharp />,
  },
  {
    description: "Filter",
    icon: <FilterAlt />,
  },
  {
    description: "Sort",
    icon: <FilterList />,
  },
];

const Home = () => {
  const list = useSelector((state) => state.profile.profileFields.list);
  const showBy = useSelector((state) => state.profile.showBy);
  const status = useSelector((state) => state.status);
  const isAuthenticated = useSelector((state) => state.profile.isAuthenticated);
  const isDialogVisible = useSelector((state) => state.menu.openDialog);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sortedList = list.reduce(
    (acc, currentList) => {
      const currentStatus = currentList.animeStatus
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
          return index == 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/\s+/g, "");

      acc[`${currentStatus}`].push(currentList);

      return acc;
    },
    {
      "currentlyWatching": [],
      "planToWatch": [],
      "completed": [],
    }
  );

  const handleClose = () => {
    dispatch(
      handleError({
        error: false,
        errorMessage: status.errorMessage,
      })
    );
  };

  return (
    <Box id="container" sx={homeStyles.container}>
      {!isAuthenticated ? (
        <>
          <Dialog open={status.refreshError} slotProps={homeStyles.backdrop} transitionDuration={0}>
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

          <Box sx={{ ...homeStyles.filters, display: "flex", justifyContent: "end", gap: "10px" }}>
            <Skeleton variant="circular" width={"30px"} height={"30px"}></Skeleton>
            <Skeleton variant="circular" width={"30px"} height={"30px"}></Skeleton>
            <Skeleton variant="circular" width={"30px"} height={"30px"}></Skeleton>
          </Box>

          <Box>
            <Box sx={homeStyles.listStyle}>
              <Skeleton variant="text" height={"32px"} sx={{ marginBottom: 2 }}></Skeleton>
              <Skeleton variant="rounded" height={"92px"} sx={{ marginBottom: "20px" }}></Skeleton>
            </Box>

            <Box sx={homeStyles.listStyle}>
              <Skeleton variant="text" height={"32px"} sx={{ marginBottom: 2 }}></Skeleton>
              <Skeleton variant="rounded" height={"92px"} sx={{ marginBottom: "20px" }}></Skeleton>
            </Box>

            <Box sx={homeStyles.listStyle}>
              <Skeleton variant="text" height={"32px"} sx={{ marginBottom: 2 }}></Skeleton>
              <Skeleton variant="rounded" height={"92px"} sx={{ marginBottom: "20px" }}></Skeleton>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Snackbar
            open={status.error && !isDialogVisible}
            onClose={handleClose}
            autoHideDuration={3000}
            TransitionComponent={Zoom}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
            <Alert severity="error" onClose={handleClose}>
              {status.errorMessage[0].msg}
            </Alert>
          </Snackbar>

          <Menu />

          <FormControl fullWidth sx={homeStyles.selectForm}>
            <InputLabel id="select-label">Select anime list</InputLabel>

            <Select
              label="Select anime list"
              labelId="select-label"
              value={showBy}
              MenuProps={{
                marginThreshold: 10,
              }}
              onChange={(e) => dispatch(handleUserSortingStatus(e.target.value))}>
              <MenuItem value={"All anime"}>All anime</MenuItem>
              <MenuItem value={"Currently watching"}>Currently watching</MenuItem>
              <MenuItem value={"Completed"}>Completed</MenuItem>
              <MenuItem value={"Plan to watch"}>Plan to watch</MenuItem>
            </Select>
          </FormControl>

          <Box sx={homeStyles.filters}>
            {filterIcons.map((filterIcon) => {
              const { description, icon } = filterIcon;

              return (
                <Tooltip TransitionComponent={Zoom} title={description} key={description} arrow>
                  <IconButton>{icon}</IconButton>
                </Tooltip>
              );
            })}
          </Box>

          <Box id="list">
            <Box
              id="watching"
              sx={
                showBy === "Currently watching" || showBy === "All anime"
                  ? homeStyles.listStyle
                  : { display: "none" }
              }>
              <Typography variant="h6" marginBottom={2} textAlign={"center"}>
                Currently watching
              </Typography>

              {sortedList.currentlyWatching.map((listProp, idx) => {
                const { animeName, animeStatus, currentEpisode, allEpisodes, score, animeType } = listProp

                return (
                  <Card
                    key={idx}
                    index={idx}
                    animeName={animeName}
                    animeType={animeType}
                    animeStatus={animeStatus}
                    currentEpisode={currentEpisode}
                    allEpisodes={allEpisodes}
                    score={score}
                  />
                );
              })}
            </Box>

            <Box
              id="completed"
              sx={
                showBy === "Completed" || showBy === "All anime" ? homeStyles.listStyle : { display: "none" }
              }>
              <Typography variant="h6" marginBottom={2} textAlign={"center"}>
                Completed
              </Typography>

              {sortedList.completed.map((listProp, idx) => {
                const { animeName, animeStatus, currentEpisode, allEpisodes, score, animeType } = listProp;

                return (
                  <Card
                    key={idx}
                    index={idx}
                    animeName={animeName}
                    animeType={animeType}
                    animeStatus={animeStatus}
                    currentEpisode={currentEpisode}
                    allEpisodes={allEpisodes}
                    score={score}
                  />
                );
              })}
            </Box>

            <Box
              id="plan to watch"
              sx={showBy === "Plan to watch" || showBy === "All anime" ? {} : { display: "none" }}>
              <Typography variant="h6" marginBottom={2} textAlign={"center"}>
                Plan to watch
              </Typography>

              {sortedList.planToWatch.map((listProp, idx) => {
                const { animeName, animeStatus, currentEpisode, allEpisodes, score, animeType } = listProp;

                return (
                  <Card
                    key={idx}
                    index={idx}
                    animeName={animeName}
                    animeType={animeType}
                    animeStatus={animeStatus}
                    currentEpisode={currentEpisode}
                    allEpisodes={allEpisodes}
                    score={score}
                  />
                );
              })}
            </Box>
          </Box>
        </>
      )}
      <EditList />
    </Box>
  );
};

export default Home;
