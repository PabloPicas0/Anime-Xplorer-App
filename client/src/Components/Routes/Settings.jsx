import { Box, Typography } from "@mui/material";

const settingsStyles = {
  container: {
    display: "flex",
    margin: "64px auto 0px auto", // margin due to 64px height of navbar to prevent stacking
    maxWidth: "1024px",
    padding: "3rem 10px",
    minHeight: "50vh",
  },
  settingsColumns: {
    width: "100%",
    maxWidth: "20%",
    borderRight: "1px solid #d9dbdf",
  },
  margin: {
    marginY: "10px",
  },
  settingsOptions: {
    marginLeft: "20px",
  },
  settingsOptionsMargin: {
    marginY: "20px",
  },
};

// TODO
// Page does not display full proper color 

const Settings = () => {
  return (
    <Box sx={settingsStyles.container}>
      <Box id="settings" sx={settingsStyles.settingsColumns}>
        <Typography sx={settingsStyles.margin}>Lorem ipsum</Typography>
        <Typography sx={settingsStyles.margin}>Lorem ipsum</Typography>
        <Typography sx={settingsStyles.margin}>Lorem ipsum</Typography>
        <Typography sx={settingsStyles.margin}>Lorem ipsum</Typography>
        <Typography sx={settingsStyles.margin}>Lorem ipsum</Typography>
      </Box>

      <Box id="settings-options" sx={settingsStyles.settingsOptions}>
        <Typography sx={settingsStyles.settingsOptionsMargin}>Lorem ipsum</Typography>
        <Typography sx={settingsStyles.settingsOptionsMargin}>Lorem ipsum</Typography>
        <Typography sx={settingsStyles.settingsOptionsMargin}>Lorem ipsum</Typography>
        <Typography sx={settingsStyles.settingsOptionsMargin}>Lorem ipsum</Typography>
        <Typography sx={settingsStyles.settingsOptionsMargin}>Lorem ipsum</Typography>
      </Box>
    </Box>
  );
};

export default Settings;
