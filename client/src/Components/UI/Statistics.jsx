import { BarChartSharp, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Skeleton,
  Slide,
  Typography,
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { cheerfulFiestaPalette, mangoFusionPalette } from "@mui/x-charts/colorPalettes";

import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { handleStatisticsData, handleStatisticsLoading } from "../Redux/Slices/statisticsSlice";

import useErrorHandler from "../Utils/useErrorHandler";
import { handleError } from "../Redux/Slices/statusSlice";

import url from "../Utils/api";

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
  const isLoading = useSelector((state) => state.statistics.isStatisticsLoading);
  const statistics = useSelector((state) => state.statistics.statistics);
  const currentYear = new Date().toLocaleDateString("en-GB", { year: "numeric" });

  const { name } = useParams();

  const [openStatistics, setOpenStatistic] = useState(false);

  const dispatch = useDispatch();
  const errorHandler = useErrorHandler();

  const handleStatistics = async () => {
    setOpenStatistic(true);
    dispatch(handleStatisticsLoading(true));

    try {
      const request = await fetch(`${url}/api/list/statistics`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: `username=${name || username}`,
      });

      const response = await request.json();
      // console.log(response);

      errorHandler(response);
      dispatch(handleStatisticsData([response.monthCompletedTitles, response.monthWatchedEpisodes]));
      dispatch(handleStatisticsLoading(false));
    } catch (error) {
      console.error(error);

      dispatch(handleStatisticsLoading(true));
      dispatch(
        handleError({ error: true, errorMessage: [{ msg: "Connection error. Please try again later." }] })
      );
    }
  };

  const xAxisScale = useMemo(() => {
    const months = [];

    for (let i = 1; i <= 12; i++) {
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
        onClick={() => {
          handleStatistics();
        }}>
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
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            placeItems: "center",
            padding: { xs: 0, md: "0px 24px 20px 24px" },
          }}>
          {isLoading ? (
            <>
              <Box sx={{ marginBottom: "30px" }}>
                <Skeleton variant="text" sx={{ marginBottom: "20px" }} />
                <Skeleton variant="circular" width={210} height={210} />
              </Box>

              <Box sx={{ marginBottom: "30px" }}>
                <Skeleton variant="text" sx={{ marginBottom: "20px" }} />
                <Skeleton variant="circular" width={210} height={210} />
              </Box>

              <Box sx={{ marginBottom: "30px" }}>
                <Skeleton variant="text" sx={{ marginBottom: "20px" }} />
                <Skeleton variant="rectangular" width={300} height={300} />
              </Box>

              <Box sx={{ marginBottom: "30px" }}>
                <Skeleton variant="text" sx={{ marginBottom: "20px" }} />
                <Skeleton variant="rectangular" width={300} height={300} />
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ width: "100%" }}>
                <Typography textAlign={"center"} marginBottom={"10px"}>
                  Anime rating ratio
                </Typography>

                <PieChart
                  colors={mangoFusionPalette}
                  series={[
                    {
                      data: ratingRatioDataset,
                      innerRadius: 30,
                      outerRadius: 100,
                      paddingAngle: 5,
                      cornerRadius: 5,
                      startAngle: -90,
                      endAngle: 270,
                    },
                  ]}
                  legend={{ hidden: true }}
                  height={300}
                  margin={{ left: 95 }}
                />
              </Box>

              <Box sx={{ width: "100%" }}>
                <Typography textAlign={"center"} marginBottom={"10px"}>
                  Anime status ratio
                </Typography>

                <PieChart
                  colors={cheerfulFiestaPalette}
                  series={[
                    {
                      data: statusRatioDataset,
                      innerRadius: 30,
                      outerRadius: 100,
                      paddingAngle: 5,
                      cornerRadius: 5,
                      startAngle: -90,
                      endAngle: 270,
                    },
                  ]}
                  legend={{ hidden: true }}
                  height={300}
                  margin={{ left: 95 }}
                />
              </Box>

              <Box sx={{ width: { xs: "100%", lg: "70%" } }}>
                <Typography textAlign={"center"}>Monthly watched episodes</Typography>

                <LineChart
                  yAxis={[{ tickMinStep: 1 }]}
                  xAxis={[{ scaleType: "band", data: xAxisScale }]}
                  series={[
                    {
                      label: "Episodes watched",
                      curve: "linear",
                      data: Object.values(statistics[1] ? statistics[1][currentYear] : {}),
                    },
                  ]}
                  legend={{ hidden: true }}
                  height={300}
                />
              </Box>

              <Box sx={{ width: { xs: "100%", lg: "70%" } }}>
                <Typography textAlign={"center"}> Monthly completed anime</Typography>

                <BarChart
                  yAxis={[{ tickMinStep: 1 }]}
                  xAxis={[{ scaleType: "band", data: xAxisScale }]}
                  series={[
                    {
                      label: "Completed titles",
                      data: Object.values(statistics[0] ? statistics[0][currentYear] : {}),
                    },
                  ]}
                  height={300}
                />
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Statistics;
