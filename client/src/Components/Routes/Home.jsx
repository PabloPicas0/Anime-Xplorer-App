import { Box, Grow, IconButton, Tooltip, Zoom } from "@mui/material";
import {
  Add,
  BarChartSharp,
  FilterAlt,
  FilterList,
  HomeOutlined,
  LogoutSharp,
  Person,
  Settings,
} from "@mui/icons-material";
import { useState } from "react";

const homeStyles = {
  container: {
    margin: "64px auto 0px auto", // margin due to 64px height of navbar to prevent stacking
    maxWidth: "1024px",
    padding: "3rem 10px",
  },
  menu: {
    display: "flex",
    gap: "10px",
  },
  heroIconWrapper: {
    border: "2px solid #d9dbdf",
  },
  heroIcon: {
    width: "100px",
    height: "100px",
  },
  options: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
  homeIcon: {
    justifyContent: "start",
  },
  filters: {
    textAlign: "end",
    marginTop: "20px",
  },
};

const filterIcons = [
  {
    description: "Statistic",
    icon: <BarChartSharp />,
  },
  {
    description: "Filter",
    icon: <FilterAlt />,
  },
  {
    description: "Sort",
    icon: <FilterList />,
  },
];

const Home = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Box id="container" sx={homeStyles.container}>
      <Box sx={homeStyles.menu}>
        <Box>
          <Tooltip TransitionComponent={Zoom} title="Open Settings" arrow>
            <IconButton
              size="large"
              sx={homeStyles.heroIconWrapper}
              onClick={() => setChecked((prev) => !prev)}>
              <Person sx={homeStyles.heroIcon} />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={homeStyles.options}>
          <Box>
            <Grow in={checked}>
              <Tooltip TransitionComponent={Zoom} title="Home" arrow>
                <IconButton size="large" sx={homeStyles.homeIcon}>
                  <HomeOutlined />
                </IconButton>
              </Tooltip>
            </Grow>
          </Box>

          <Box id="options">
            <Grow in={checked}>
              <Tooltip TransitionComponent={Zoom} title="Add to list" arrow>
                <IconButton size="large">
                  <Add />
                </IconButton>
              </Tooltip>
            </Grow>

            <Grow in={checked} {...(checked ? { timeout: 500 } : {})}>
              <Tooltip TransitionComponent={Zoom} title="Account settings" arrow>
                <IconButton size="large">
                  <Settings />
                </IconButton>
              </Tooltip>
            </Grow>

            <Grow in={checked} {...(checked ? { timeout: 550 } : {})}>
              <Tooltip TransitionComponent={Zoom} title="Logout" arrow>
                <IconButton size="large">
                  <LogoutSharp />
                </IconButton>
              </Tooltip>
            </Grow>
          </Box>
        </Box>
      </Box>

      <Box style={homeStyles.filters}>
        {filterIcons.map((filterIcon) => {
          const { description, icon } = filterIcon;

          return (
            <Tooltip TransitionComponent={Zoom} title={description} arrow>
              <IconButton>{icon}</IconButton>
            </Tooltip>
          );
        })}
      </Box>

      <Box sx={homeStyles.listStyle}></Box>
    </Box>
  );
};

export default Home;
