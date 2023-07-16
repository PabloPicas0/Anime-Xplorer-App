import "./App.css";

import { Box, IconButton, Typography } from "@mui/material";
import {
  AddHomeWorkSharp,
  ConstructionSharp,
  KeyboardArrowRightSharp,
  QueryStatsSharp,
} from "@mui/icons-material";

const rootStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#edf1f5",
  },
  contentBox: {
    maxWidth: "1300px",
    color: "whitesmoke",
    backgroundColor: "#0a1625",
    padding: "6rem 5rem 3rem 5rem",
    borderRadius: "20px",
    boxShadow: 24,
  },
  title: {
    marginBottom: "2.5rem",
    textAlign: "center",
  },
  cardWrapper: {
    display: "flex",
    justifyContent: "space-between",
    gap: "3rem",
  },
  card: {
    display: "flex",
    gap: "20px",
  },
  cardIcon: {
    display: "flex",
    alignItems: "center",
  },
  joinButtonWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: "5rem",
  },
  joinButton: {
    borderRadius: "30px",
    paddingLeft: "20px",
    paddingRight: "10px",
    backgroundColor: "#1769aa",
    color: "whitesmoke",
    "&:hover": {
      backgroundColor: "#1769aa",
    },
  },
};

function App() {
  return (
    <Box component={"main"} id="landing" sx={rootStyles.container}>
      <Box sx={rootStyles.contentBox}>
        <Box component={"header"} sx={rootStyles.title}>
          <h1>Track your favorite anime with AnimeExplorer</h1>
        </Box>

        <Box sx={rootStyles.cardWrapper}>
          <Box sx={rootStyles.card}>
            <Box sx={rootStyles.cardIcon}>
              <QueryStatsSharp fontSize="large" />
            </Box>

            <Box>
              <Typography component={"h2"} marginBottom={1} fontWeight={"bold"}>
                Discover the best
              </Typography>
              <Typography component={"p"}>
                Follow your watching habits over time with in-depth statistics.
              </Typography>
            </Box>
          </Box>

          <Box sx={rootStyles.card}>
            <Box sx={rootStyles.cardIcon}>
              <AddHomeWorkSharp fontSize="large" />
            </Box>

            <Box>
              <Typography component={"h2"} marginBottom={1} fontWeight={"bold"}>
                Any time anywhere
              </Typography>
              <Typography component={"p"}>Track your progress whenever your are.</Typography>
            </Box>
          </Box>

          <Box sx={rootStyles.card}>
            <Box sx={rootStyles.cardIcon}>
              <ConstructionSharp fontSize="large" />
            </Box>

            <Box>
              <Typography component={"h2"} marginBottom={1} fontWeight={"bold"}>
                Tweak your style
              </Typography>
              <Typography component={"p"}>
                Customize your color sheme, font format, sorting and much more !
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={rootStyles.joinButtonWrapper}>
          <IconButton sx={rootStyles.joinButton}>
            Join Now
            <KeyboardArrowRightSharp fontSize="large" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
