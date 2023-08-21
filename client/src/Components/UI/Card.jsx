import { Add, Remove } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

import { useDispatch } from "react-redux";

import url from "../Utils/api";
import { handleError } from "../Redux/Slices/statusSlice";
import { handleAuthentication, handleClientList } from "../Redux/Slices/profileSclice";

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
};

const Card = (props) => {
  const { index, animeName, animeStatus, currentEpisode, allEpisodes, score } = props;

  const dispatch = useDispatch();

  // TODO
  // Refactor this function to dispatch error based on token expiration
  const handleEpisodeChange = async (newEpisode) => {
    if (newEpisode <= 0) newEpisode = 0;
    if (newEpisode >= allEpisodes) newEpisode = allEpisodes;

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
          <Typography>Ova</Typography>
          <Typography>{animeName}</Typography>
          <Typography>Edit</Typography>
        </Box>
      </Box>

      <Box sx={cardStyles.progress}>
        <IconButton onClick={() => handleEpisodeChange(currentEpisode - 1)}>
          <Remove />
        </IconButton>

        <Typography>
          {currentEpisode}/{allEpisodes}
        </Typography>

        <IconButton onClick={() => handleEpisodeChange(currentEpisode + 1)}>
          <Add />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Card;
