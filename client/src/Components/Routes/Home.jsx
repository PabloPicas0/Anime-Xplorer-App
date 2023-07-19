import { Box, Typography } from "@mui/material";

const homeStyles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    backgroundColor: "#fafafa",
    marginTop: "64px", // margin due to 64px height of navbar to prevent stacking
  },
};

const Home = () => {
  return (
    <Box sx={homeStyles.container}>
      <h1>Welcome Back "Username"</h1>
    </Box>
  );
};

export default Home;
