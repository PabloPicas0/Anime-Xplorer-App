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
  Skeleton,
  Snackbar,
  Typography,
  Menu,
  Zoom,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { BarChartSharp, FilterAlt, North, SortSharp, South } from "@mui/icons-material";

import Card from "../UI/Card";
import UserMenu from "../UI/Menu";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { handleUserSortingStatus } from "../Redux/Slices/profileSclice";
import { handleError } from "../Redux/Slices/statusSlice";
import useSorting from "../Utils/useSorting";

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
  menuList: {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
  },
  menuText: {
    textAlign: "start",
  },
  menuItem: {
    "&:hover": {
      color: homeStyles.colors.purple,
    },
  },
  colors: {
    purple: "rgb(143 68 217)",
    washedBlack: "rgba(0, 0, 0, 0.54)",
    black: "#000",
  },
};

const Home = () => {
  const list = useSelector((state) => state.profile.profileFields.list);
  const showBy = useSelector((state) => state.profile.showBy);
  const status = useSelector((state) => state.status);
  const isAuthenticated = useSelector((state) => state.profile.isAuthenticated);

  const [sort, setSort] = useState(null);

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
                startIcon={<BarChartSharp sx={{ color: "rgba(0, 0, 0, 0.54)" }} />}
                sx={{ ...homeStyles.filterButtonSpacing, color: "#000" }}>
                Statistics
              </Button>
            </>

            <>
              <Button
                startIcon={<FilterAlt sx={{ color: "rgba(0, 0, 0, 0.54)" }} />}
                sx={{ ...homeStyles.filterButtonSpacing, color: "#000" }}>
                Filter
              </Button>
            </>

            <>
              <Button
                startIcon={
                  <SortSharp
                    sx={
                      Boolean(sort)
                        ? { color: homeStyles.colors.purple }
                        : { color: homeStyles.colors.washedBlack }
                    }
                  />
                }
                sx={Boolean(sort) ? { color: homeStyles.colors.purple } : { color: homeStyles.colors.black }}
                onClick={(e) => setSort(e.currentTarget)}>
                Sort
              </Button>

              <Menu
                anchorEl={sort}
                open={Boolean(sort)}
                slotProps={homeStyles.menu}
                MenuListProps={homeStyles.menuList}
                onClose={() => setSort(null)}>
                <MenuItem
                  onClick={() => setSortOrder("asc")}
                  sx={homeStyles.menuItem}>
                  <ListItemIcon sx={{ color: "inherit" }}>
                    <North />
                  </ListItemIcon>
                  <ListItemText sx={homeStyles.menuText}>Sort Ascending</ListItemText>
                </MenuItem>

                <MenuItem
                  onClick={() => setSortOrder("desc")}
                  sx={homeStyles.menuItem}>
                  <ListItemIcon sx={{ color: "inherit" }}>
                    <South />
                  </ListItemIcon>
                  <ListItemText sx={homeStyles.menu}>Sort Descending</ListItemText>
                </MenuItem>
              </Menu>
            </>
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
