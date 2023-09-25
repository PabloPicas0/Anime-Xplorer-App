import { SearchRounded } from "@mui/icons-material";
import { Collapse, Divider, IconButton, InputBase, Paper, Tooltip, Zoom } from "@mui/material";

import { useState } from "react";

const CustomSearchInputStyles = {
  paper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    inputProps: {
      "aria-label": "find user",
    },
    inputStyles: {
      marginLeft: "0.5rem",
    },
  },
  divider: {
    margin: "0.5rem",
    height: "28px",
  },
};

const CustomSearchInput = () => {
  const [seeSearch, setSeeSearch] = useState(false);

  return (
    <Paper component={"form"} elevation={seeSearch ? 3 : 0} sx={CustomSearchInputStyles.paper}>
      <Collapse in={seeSearch} orientation="horizontal">
        <InputBase
          type="search"
          placeholder="Find user"
          inputProps={CustomSearchInputStyles.input.inputProps}
          sx={CustomSearchInputStyles.input.inputStyles}
        />
      </Collapse>

      <Collapse in={seeSearch} orientation="horizontal">
        <Divider orientation="vertical" sx={CustomSearchInputStyles.divider} />
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
