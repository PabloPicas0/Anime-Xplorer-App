import { BarChartSharp, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Typography,
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";

import { useMemo, useState } from "react";
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
  const list = useSelector((state) => state.profile.profileFields.list);

  const { name } = useParams();

  const [openStatistics, setOpenStatistic] = useState(false);

  const xAxisScale = useMemo(() => {
    const currentMonth = Number(new Date().toLocaleDateString("en-GB", { month: "numeric" }));
    const months = [];

    for (let i = 1; i <= currentMonth; i++) {
      months.push(
        new Date(`1995-${i < 10 ? "0" + i : i}-17T00:00:00`).toLocaleDateString("en-GB", { month: "short" })
      );
    }

    return months;
  }, []);

  const statusRatioDataset = Object.values(
    list.reduce((acc, anime) => {
      const status = anime.animeStatus.replace(/\s/g, "");

      acc[status] = {
        value: acc[status]?.value + 1 || 1,
        label: anime.animeStatus,
      };

      return acc;
    }, {})
  ).map((status, index) => {
    const { value, label } = status;

    return { id: index, value: value, label: label };
  });

  const ratingRatioDataset = Object.values(
    list.reduce((acc, anime) => {
      const { score } = anime;

      acc[score] = {
        id: score,
        value: acc[score]?.value + 1 || 1,
        label: `${score}/5`,
      };

      return acc;
    }, {})
  );

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

        <DialogContent
          sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, placeItems: "center" }}>
          <Box>
            <Typography textAlign={"center"}>Anime rating ratio</Typography>

            <PieChart
              series={[
                {
                  data: ratingRatioDataset,
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
                  data: statusRatioDataset,
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
            <Typography textAlign={"center"}>Monthly watched episodes</Typography>
            <LineChart
              xAxis={[{ scaleType: "band", data: xAxisScale }]}
              series={[
                {
                  label: "Episodes watched",
                  data: [2, 5.5, 2, 8.5, 1.5, 5, 1, 2, 3, 4],
                },
              ]}
              legend={{ hidden: true }}
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

// TODO //
// Make responsive stats on mobile screens //
// Change colors of chats //

export default Statistics;
