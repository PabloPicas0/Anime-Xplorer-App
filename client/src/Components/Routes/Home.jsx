import { Box, IconButton, Typography } from "@mui/material";
import { Add, HomeOutlined, LogoutSharp, Person, Settings } from "@mui/icons-material";

const homeStyles = {
  container: {
    margin: "64px auto 0px auto", // margin due to 64px height of navbar to prevent stacking
    maxWidth: "1024px",
    padding: "3rem 10px",
  },
  heroIconStyles: {
    transform: "translateY(50%)",
  },
  menuStyles: {
    display: "flex",
  },
  optionsStyles: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  homeIconStyles: {
    justifyContent: "start",
  },
};

const Home = () => {
  return (
    <Box id="container" sx={homeStyles.container}>
      <Box sx={homeStyles.menuStyles}>
        <Box>
          <IconButton sx={homeStyles.heroIconStyles} size="large">
            <Person />
          </IconButton>
        </Box>

        <Box sx={homeStyles.optionsStyles}>
          <Box>
            <IconButton size="large" sx={homeStyles.homeIconStyles}>
              <HomeOutlined />
            </IconButton>
          </Box>

          <Box id="options">
            <IconButton size="large">
              <Add />
            </IconButton>

            <IconButton size="large">
              <Settings />
            </IconButton>

            <IconButton size="large">
              <LogoutSharp />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Typography sx={homeStyles.sectionTitle}>All anime "current section"</Typography>

      <Box sx={homeStyles.listStyle}></Box>
    </Box>
  );
};

export default Home;
