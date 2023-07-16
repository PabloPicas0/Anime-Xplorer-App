import "./App.css";

import { Box, IconButton, Typography } from "@mui/material";
import {
  AddHomeWorkSharp,
  ConstructionSharp,
  KeyboardArrowRightSharp,
  QueryStatsSharp,
} from "@mui/icons-material";
import { Outlet } from "react-router-dom";

const rootStyles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
  },
};

function App() {
  return (
    <>
      <Box component={"nav"} id="navbar" sx={rootStyles.container}>
        HI
      </Box>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default App;
