import { BarChartSharp, Close } from "@mui/icons-material";
import { Box, Button, Dialog, DialogTitle, IconButton } from "@mui/material";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const statisticsStyles = {
  filterButtonSpacing: {
    marginRight: "15px",
  },
  colors: {
    purple: "rgb(143 68 217)",
    washedBlack: "rgba(0, 0, 0, 0.54)",
    black: "rgb(0, 0, 0)",
    hoverPurple: "rgb(243, 234, 251)",
  },
};

                    // TODO //
// Fix visible sidenav when user stats are active //

const Statistics = () => {
  const darkMode = useSelector((state) => state.profile.profileFields.options[0].darkMode);
  const username = useSelector((state) => state.profile.profileFields.username);

  const { name } = useParams();

  const [openStatistics, setOpenStatistic] = useState(false);

  return (
    <>
      <Button
        startIcon={
          <BarChartSharp
            sx={{
              color: darkMode ? "#fff" : "rgba(0, 0, 0, 0.54)",
            }}
          />
        }
        sx={{
          ...statisticsStyles.filterButtonSpacing,
          color: darkMode ? "#fff" : statisticsStyles.colors.washedBlack,
        }}
        onClick={() => setOpenStatistic(true)}>
        Statistics
      </Button>

      <Dialog onClose={() => setOpenStatistic(false)} open={openStatistics} fullScreen>
        <Box sx={{ display: "flex", justifyContent: "end", paddingX: "2.2rem", paddingY: "1rem" }}>
          <IconButton size="large" color="error" onClick={() => setOpenStatistic(false)} aria-label="close">
            <Close />
          </IconButton>
        </Box>
        <DialogTitle textAlign={"center"}> {name || username} Stats</DialogTitle>
      </Dialog>
    </>
  );
};

export default Statistics;
