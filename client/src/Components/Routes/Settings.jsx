import { Box, Typography } from "@mui/material";
import Menu from "../UI/Menu";

const settingsStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "6rem",
    margin: "0px auto 0px auto", // margin due to 64px height of navbar to prevent stacking
    maxWidth: "1024px",
    padding: "3rem 10px",
    minHeight: "100vh",
  },
  mainWrapper: {
    display: "flex",
  },
  settingsWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRight: "1px solid #d9dbdf",
    paddingRight: { xs: "20px", sm: "40px" },
  },
  margin: {
    marginBottom: "15px",
  },
  optionsWrapper: {
    marginLeft: "20px",
  },
  optionsMargin: {
    marginBottom: "20px",
  },
};

const Settings = () => {
  return (
    <Box sx={settingsStyles.container}>
      <Menu />

      <Box sx={settingsStyles.mainWrapper}>
        <Box id="settings" sx={settingsStyles.settingsWrapper}>
          {[...Array(5)].map((_, idx) => {
            return (
              <Typography key={idx} sx={settingsStyles.margin}>
                Lorem ipsum
              </Typography>
            );
          })}
        </Box>

        <Box id="settings-options" sx={settingsStyles.optionsWrapper}>
          {[...Array(5)].map((_, idx) => {
            return (
              <Typography key={idx} sx={settingsStyles.margin}>
                Lorem ipsum
              </Typography>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
