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
  Snackbar,
  Typography,
  Zoom,
} from "@mui/material";
import { BarChartSharp } from "@mui/icons-material";

import Card from "../../UI/Card";
import UserMenu from "../../UI/Menu";
import Sort from "../../UI/Sort";
import Filter from "../../UI/Filter";

import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLoaderData, useNavigate, useParams } from "react-router-dom";
import useSorting from "../../Utils/useSorting";

import { handleUserSortingStatus } from "../../Redux/Slices/profileSclice";
import { handleError } from "../../Redux/Slices/statusSlice";
import HomeSkeleton from "../../UI/HomeSkeleton";

const homeStyles = {
  container: {
    margin: "64px auto 0px auto", // margin due to 64px height of navbar to prevent stacking - TO FIX mobile navbar have smaller height
    maxWidth: "1024px",
    padding: "3rem 10px",
    minHeight: "calc(100vh - 64px)",
  },
  filters: {
    display: "flex",
    justifyContent: "end",
    textAlign: "end",
    margin: "20px 0px",
  },
  filterButtonSpacing: {
    marginRight: "15px",
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
  menu: {
    paper: {
      style: {
        borderRadius: "15px",
      },
    },
    root: {
      style: {
        position: "absolute",
        zIndex: 1099,
      },
    },
  },
  sortMenuList: {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
  },
  filterMenuList: {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "10px",
      padding: "8px",
    },
  },
  menuText: {
    textAlign: "start",
  },
  menuItem: {
    borderRadius: "15px",
    height: "80px",
    justifyContent: "center",
    flexDirection: "column",
    gap: "10px",
    color: "rgba(0, 0, 0, 0.6)",
  },
  menuItemHover: {
    "&:hover": {
      color: "rgb(143, 68, 217)",
      backgroundColor: "rgb(243, 234, 251)",
    },
  },
  colors: {
    purple: "rgb(143 68 217)",
    washedBlack: "rgba(0, 0, 0, 0.54)",
    black: "rgb(0, 0, 0)",
    hoverPurple: "rgb(243, 234, 251)",
  },
};

// TODO //
// Filter icons are collapsing on res 320px // 

const Home = () => {
  const data = useLoaderData() || {};
  const { name } = useParams();

  const list = useSelector((state) => state.profile.profileFields.list);
  const showBy = useSelector((state) => state.profile.showBy);
  const status = useSelector((state) => state.status);
  const isAuthenticated = useSelector((state) => state.profile.isAuthenticated);
  const darkMode = useSelector((state) => state.profile.profileFields.options[0]?.darkMode);
  const username = useSelector((state) => state.profile.profileFields.username);

  const isUserAccount = name === username;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { groupList, setSortOrder } = useSorting(list);

  const handleClose = () => {
    dispatch(
      handleError({
        error: false,
        errorMessage: status.errorMessage,
      })
    );
  };

  // Prevents from load user account from adress bar if he hits this route "/user/:name" //
  // Returns Navigate component instead hook to prevent react errors //
  if (isUserAccount) return <Navigate to={"/home"} />;

  // Prevents from load users that don't exists from address bar //
  //eg. route "/user/:name" ---> user hit in address bar "/user/1" show error if user not exists //
  if (name && !data.users) throw new Error("User don't exists");

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

          <HomeSkeleton />
        </>
      ) : (
        <>
          <Snackbar
            open={status.error}
            onClose={handleClose}
            autoHideDuration={3000}
            TransitionComponent={Zoom}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
            <Alert severity="error" onClose={handleClose}>
              {status.errorMessage[0].msg}
            </Alert>
          </Snackbar>

          <UserMenu />

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
            <>
              <Button
                startIcon={
                  <BarChartSharp
                    sx={{
                      color: darkMode ? "#fff" : "rgba(0, 0, 0, 0.54)",
                    }}
                  />
                }
                sx={{
                  ...homeStyles.filterButtonSpacing,
                  color: darkMode ? "#fff" : homeStyles.colors.washedBlack,
                }}>
                Statistics
              </Button>
            </>

            <Filter />
            <Sort setSortOrder={setSortOrder} />
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

              {groupList.currentlyWatching.map((listProp, idx) => {
                const { animeName, animeStatus, currentEpisode, allEpisodes, score, animeType } = listProp;

                return (
                  <Card
                    key={animeName}
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

              {groupList.completed.map((listProp, idx) => {
                const { animeName, animeStatus, currentEpisode, allEpisodes, score, animeType } = listProp;

                return (
                  <Card
                    key={animeName}
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

              {groupList.planToWatch.map((listProp, idx) => {
                const { animeName, animeStatus, currentEpisode, allEpisodes, score, animeType } = listProp;

                return (
                  <Card
                    key={animeName}
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
    </Box>
  );
};

export default Home;
