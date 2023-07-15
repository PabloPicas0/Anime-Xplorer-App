import "./App.css";

import { Box, Typography } from "@mui/material";
import { AddHomeWorkSharp, ConstructionSharp, QueryStatsSharp } from "@mui/icons-material";

const rootStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#edf1f5",
  },
  contentBox: {
    color: "whitesmoke",
    backgroundColor: "#0a1625",
    padding: "10rem 5rem",
    borderRadius: "20px",
    boxShadow: 24,
  },
  card: {
    display: "flex",
  },
};

function App() {
  return (
    <Box component={"main"} id="landing" sx={rootStyles.container}>
      <Box sx={rootStyles.contentBox}>
        <header>
          <h1>Track your favorite anime with AnimeXplorer</h1>
        </header>

        <Box>
          <Box sx={rootStyles.card}>
            <Box>
              <QueryStatsSharp fontSize="large" />
            </Box>

            <Box>
              <Typography component={"h2"}>Discover the best</Typography>
              <Typography component={"p"}>
                Follow your watching habits over time with in-depth statistics.
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={rootStyles.card}>
          <Box>
            <AddHomeWorkSharp fontSize="large" />
          </Box>

          <Box>
            <Typography component={"h2"}>Any time anywhere</Typography>
            <Typography component={"p"}>Track your progress whenever your are.</Typography>
          </Box>
        </Box>

        <Box sx={rootStyles.card}>
          <Box>
            <ConstructionSharp fontSize="large" />
          </Box>

          <Box>
            <Typography component={"h2"}>Tweak your style</Typography>
            <Typography component={"p"}>
              Customize your color sheme, font format, sorting and much more !
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
