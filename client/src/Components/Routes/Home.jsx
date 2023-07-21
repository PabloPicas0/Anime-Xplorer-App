import { Box, IconButton, Tooltip, Zoom } from "@mui/material";
import { BarChartSharp, FilterAlt, FilterList } from "@mui/icons-material";

import Card from "../UI/Card";
import Menu from "../UI/Menu";

const homeStyles = {
  container: {
    margin: "64px auto 0px auto", // margin due to 64px height of navbar to prevent stacking
    maxWidth: "1024px",
    padding: "3rem 10px",
  },
  filters: {
    textAlign: "end",
    margin: "20px 0px",
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
  return (
    <Box id="container" sx={homeStyles.container}>
      <Menu />

      <Box style={homeStyles.filters}>
        {filterIcons.map((filterIcon) => {
          const { description, icon } = filterIcon;

          return (
            <Tooltip TransitionComponent={Zoom} title={description} key={description} arrow>
              <IconButton>{icon}</IconButton>
            </Tooltip>
          );
        })}
      </Box>

      <Box id="list" sx={homeStyles.listStyle}>
        {[...Array(5)].map((_, idx) => (
          <Card key={idx} />
        ))}
      </Box>
    </Box>
  );
};

export default Home;
