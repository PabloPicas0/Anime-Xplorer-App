import { SearchRounded } from "@mui/icons-material";
import { Collapse, Divider, IconButton, InputBase, Paper, Tooltip, Zoom } from "@mui/material";
import { useState } from "react";

const CustomSearchInput = () => {
  const [seeSearch, setSeeSearch] = useState(false);

  return (
    <Paper
      component={"form"}
      elevation={seeSearch ? 3 : 0}
      sx={{ padding: "2px 4px", display: "flex", alignItems: "center" }}>
      <Collapse in={seeSearch} orientation="horizontal">
        <InputBase type="search" placeholder="Find user" inputProps={{ "aria-label": "find user" }} />
      </Collapse>

      <Collapse in={seeSearch} orientation="horizontal">
        <Divider orientation="vertical" sx={{ margin: "0.5rem", height: "28px" }} />
      </Collapse>

      <Tooltip TransitionComponent={Zoom} title="Search" arrow>
        <IconButton size="large" onClick={() => setSeeSearch((prev) => !prev)}>
          <SearchRounded />
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

export default CustomSearchInput;
