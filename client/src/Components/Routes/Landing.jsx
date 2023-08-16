import { Box, IconButton, Typography } from "@mui/material";
import {
  AddHomeWorkSharp,
  ConstructionSharp,
  KeyboardArrowRightSharp,
  QueryStatsSharp,
} from "@mui/icons-material";

import { Link } from "react-router-dom";

const landingStyles = {
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
    padding: { xs: "2rem 1rem", lg: "6rem 5rem 3rem 5rem" },
    marginX: "20px",
    borderRadius: "20px",
    boxShadow: 24,
  },
  titleHeader: {
    marginBottom: "2.5rem",
    textAlign: "center",
  },
  title: {
    fontSize: { xs: "1.4rem", sm: "2.8rem" },
  },
  cardWrapper: {
    display: "grid",
    gridAutoFlow: { xs: "row", lg: "column" },
    justifyContent: "center",
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
    marginTop: "4.0rem",
  },
  joinButton: {
    borderRadius: "30px",
    paddingLeft: "20px",
    paddingRight: "10px",
    paddingY: "6px",
    backgroundColor: "#1769aa",
    color: "whitesmoke",
    fontSize: "1.3rem",
    "&:hover": {
      backgroundColor: "#1769aa",
    },
  },
};

const Landing = () => {
  return (
    <Box component={"main"} id="landing" sx={landingStyles.container}>
      <Box sx={landingStyles.contentBox}>
        <Box component={"header"} sx={landingStyles.titleHeader}>
          <Typography component={"h1"} sx={landingStyles.title}>
            Track your favorite anime with AnimeExplorer
          </Typography>
        </Box>

        <Box sx={landingStyles.cardWrapper}>
          <Box sx={landingStyles.card}>
            <Box sx={landingStyles.cardIcon}>
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

          <Box sx={landingStyles.card}>
            <Box sx={landingStyles.cardIcon}>
              <AddHomeWorkSharp fontSize="large" />
            </Box>

            <Box>
              <Typography component={"h2"} marginBottom={1} fontWeight={"bold"}>
                Any time anywhere
              </Typography>
              <Typography component={"p"}>Track your progress from every place on earth.</Typography>
            </Box>
          </Box>

          <Box sx={landingStyles.card}>
            <Box sx={landingStyles.cardIcon}>
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

        <Link to={`signup`} style={landingStyles.joinButtonWrapper}>
          <IconButton sx={landingStyles.joinButton}>
            Join Now
            <KeyboardArrowRightSharp fontSize="large" />
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
};

export default Landing;
