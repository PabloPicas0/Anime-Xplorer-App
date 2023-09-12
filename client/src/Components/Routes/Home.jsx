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
  filterButton: {
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
};

const Home = () => {
  const list = useSelector((state) => state.profile.profileFields.list);
  const showBy = useSelector((state) => state.profile.showBy);
  const status = useSelector((state) => state.status);
  const isAuthenticated = useSelector((state) => state.profile.isAuthenticated);

  const [filter, setFilter] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { groupList, groupListDescription, handleSortOrder } = useSorting(list);

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
            <Button startIcon={<BarChartSharp />} sx={homeStyles.filterButton}>
              Statistics
            </Button>

            <Button startIcon={<FilterAlt />} sx={homeStyles.filterButton}>
              Filter
            </Button>

            <Button startIcon={<SortSharp />} onClick={(e) => setFilter(e.currentTarget)}>
              Sort
            </Button>
            <Menu
              anchorEl={filter}
              open={Boolean(filter)}
              slotProps={homeStyles.menu}
              MenuListProps={homeStyles.menuList}
              onClose={() => setFilter(null)}
              disableScrollLock>
              <MenuItem>
                <ListItemIcon>
                  <North />
                </ListItemIcon>
                <ListItemText sx={homeStyles.menuText}>Sort Ascending</ListItemText>
              </MenuItem>

              <MenuItem>
                <ListItemIcon>
                  <South />
                </ListItemIcon>
                <ListItemText sx={homeStyles.menu}>Sort Descending</ListItemText>
              </MenuItem>
            </Menu>
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
