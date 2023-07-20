import { Box, IconButton, Tooltip, Typography, Zoom } from "@mui/material";
import { Add, HomeOutlined, LogoutSharp, Person, Settings } from "@mui/icons-material";

const homeStyles = {
  container: {
    margin: "64px auto 0px auto", // margin due to 64px height of navbar to prevent stacking
    maxWidth: "1024px",
    padding: "3rem 10px",
  },
  menuStyles: {
    display: "flex",
    gap: "10px",
  },
  heroIconWrapperStyles: {
    border: "2px solid #d9dbdf",
  },
  heroIconStyles: {
    width: "100px",
    height: "100px",
  },
  optionsStyles: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
  homeIconStyles: {
    justifyContent: "start",
  },
  sectionTitleStyles: {
    textAlign: "center",
    marginTop: "20px",
  },
};

const Home = () => {
  return (
    <Box id="container" sx={homeStyles.container}>
      <Box sx={homeStyles.menuStyles}>
        <Box>
          <Tooltip TransitionComponent={Zoom} title="Open Settings" arrow>
            <IconButton size="large" sx={homeStyles.heroIconWrapperStyles}>
              <Person sx={homeStyles.heroIconStyles} />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={homeStyles.optionsStyles}>
          <Box>
            <Tooltip TransitionComponent={Zoom} title="Home" arrow>
              <IconButton size="large" sx={homeStyles.homeIconStyles}>
                <HomeOutlined />
              </IconButton>
            </Tooltip>
          </Box>

          <Box id="options">
            <Tooltip TransitionComponent={Zoom} title="Add to list" arrow>
              <IconButton size="large">
                <Add />
              </IconButton>
            </Tooltip>

            <Tooltip TransitionComponent={Zoom} title="Account settings" arrow>
              <IconButton size="large">
                <Settings />
              </IconButton>
            </Tooltip>

            <Tooltip TransitionComponent={Zoom} title="Logout" arrow>
              <IconButton size="large">
                <LogoutSharp />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      <h1 style={homeStyles.sectionTitleStyles}>All anime</h1>

      <Box sx={homeStyles.listStyle}></Box>
    </Box>
  );
};

export default Home;
