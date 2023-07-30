import { Add, Remove } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

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
        <IconButton>
          <Remove />
        </IconButton>

        <Typography>
          {currentEpisode}/{allEpisodes}
        </Typography>

        <IconButton>
          <Add />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Card;
