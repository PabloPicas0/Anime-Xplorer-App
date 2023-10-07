import { BarChartSharp, Close } from "@mui/icons-material";
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Slide, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";

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

      <Dialog
        onClose={() => setOpenStatistic(false)}
        open={openStatistics}
        TransitionComponent={Slide}
        PaperProps={{ sx: { backgroundColor: darkMode ? "" : "#fafafa" } }}
        fullScreen>
        <Box sx={{ display: "flex", justifyContent: "end", paddingX: "2.2rem", paddingY: "1rem" }}>
          <IconButton size="large" color="error" onClick={() => setOpenStatistic(false)} aria-label="close">
            <Close />
          </IconButton>
        </Box>

        <DialogTitle textAlign={"center"}> {name || username} Stats</DialogTitle>

        <DialogContent sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", placeItems: "center" }}>
          <Box>
            <Typography textAlign={"center"}>Anime rating ratio</Typography>

            <PieChart
              series={[
                {
                  data: [...Array(10)].map((_, index) => {
                    return { id: index, value: index + 1, label: `${index + 1}/10` };
                  }),
                  innerRadius: 30,
                  outerRadius: 100,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: -90,
                  endAngle: 270,
                  cx: 350,
                },
              ]}
              legend={{ hidden: true }}
              width={700}
              height={200}
            />
          </Box>

          <Box>
            <Typography textAlign={"center"}>Anime status ratio</Typography>

            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: "Currently Watching" },
                    { id: 1, value: 15, label: "Plan to watch" },
                    { id: 2, value: 20, label: "Completed" },
                    { id: 3, value: 45, label: "All anime" },
                  ],
                  innerRadius: 30,
                  outerRadius: 100,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: -90,
                  endAngle: 270,
                  cx: 350,
                },
              ]}
              legend={{ hidden: true }}
              width={700}
              height={200}
            />
          </Box>

          <Box>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  label: "Episodes watched",
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
              width={500}
              height={300}
            />
          </Box>

          <Box>
            <Typography textAlign={"center"}>Anime completed</Typography>

            <BarChart
              xAxis={[{ scaleType: "band", data: ["group A", "group B", "group C"] }]}
              series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
              width={500}
              height={300}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Statistics;
