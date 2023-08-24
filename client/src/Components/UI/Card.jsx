import { Add, Remove } from "@mui/icons-material";
import { Box, Button, IconButton, Rating, Typography } from "@mui/material";

import { useState } from "react";
import { useDispatch } from "react-redux";

import url from "../Utils/api";

import { handleError } from "../Redux/Slices/statusSlice";
import { handleAuthentication, handleClientList } from "../Redux/Slices/profileSclice";

import EditList from "./EditList";

const cardStyles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    boxShadow: 2,
    marginBottom: "20px",
  },
  about: {
    display: "flex",
    gap: "20px",
  },
  index: {
    display: "block",
    transform: "translateY(100%)",
  },
  progress: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  rating: {
    "&.MuiRating-root": {
      color: "#ff8f00",
    },
  },
  editButton: {
    padding: 0,
    justifyContent: "start",
    minWidth: 0,
    "&:hover": { background: "transparent" },
    "&.Mui-focusVisible": {
      boxShadow: "0px 0px 10px 1px rgba(0, 0, 0, 0.16)",
    },
  },
};

const Card = (props) => {
  const { index, animeName, animeStatus, currentEpisode, allEpisodes, score, animeType } = props;

  const [isEditVisible, setIsEditVisible] = useState(false);

  const dispatch = useDispatch();

  const handleEpisodeChange = async (newEpisode) => {
    if (newEpisode < 0 || newEpisode > allEpisodes) return;

    try {
      const request = await fetch(`${url}/api/list`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: `title=${animeName}&currentEpisode=${newEpisode}`,
      });

      const response = await request.json();

      const isAuthenticationResponse = response.isAuthenticated !== undefined;

      if (isAuthenticationResponse) {
        dispatch(
          handleError({
            refreshError: response.error,
            errorMessage: response.status,
          })
        );
        dispatch(handleAuthentication(response.isAuthenticated));
      } else {
        dispatch(
          handleError({
            error: response.error,
            errorMessage: response.status,
          })
        );
      }

      if (!response.error) {
        dispatch(handleClientList(response.list));
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

  return (
    <Box sx={cardStyles.container}>
      <Box sx={cardStyles.about}>
        <Box id="number" sx={cardStyles.indexWrapper}>
          <span style={cardStyles.index}>{index + 1}</span>
        </Box>

        <Box>
          <Typography>{animeType}</Typography>
          <Typography>{animeName}</Typography>
          <Button sx={cardStyles.editButton} onClick={() => setIsEditVisible(true)} disableRipple>
            Edit
          </Button>
        </Box>
      </Box>

      <Box sx={cardStyles.progress}>
        {animeStatus === "Completed" ? (
          <Rating disabled value={score} sx={cardStyles.rating} />
        ) : (
          <>
            <IconButton onClick={() => handleEpisodeChange(currentEpisode - 1)}>
              <Remove />
            </IconButton>

            <Typography>
              {currentEpisode}/{allEpisodes}
            </Typography>

            <IconButton onClick={() => handleEpisodeChange(currentEpisode + 1)}>
              <Add />
            </IconButton>
          </>
        )}
      </Box>

      <EditList
        isEditVisible={isEditVisible}
        setIsEditVisible={setIsEditVisible}
        animeName={animeName}
        allEpisodes={allEpisodes}
        currentEpisode={currentEpisode}
        score={score}
        animeType={animeType}
        animeStatus={animeStatus}
      />
    </Box>
  );
};

export default Card;
