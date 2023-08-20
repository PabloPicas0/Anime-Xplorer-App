import { Add, Remove } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

import url from "../Utils/api";

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

  const handleEpisodeChange = async (newEpisode) => {
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

      console.log(response);
    } catch (error) {
      console.error(error);
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
