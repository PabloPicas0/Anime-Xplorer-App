import { DateRange, FilterAlt, Search, StarBorder, Tv } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonBase,
  Chip,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useDispatch, useSelector } from "react-redux";
import { handleFilter } from "../Redux/Slices/menuSlice";

import { useRef } from "react";

const filterStyles = {
  // Filter main menu //
  disablePointers: {
    pointerEvents: "none",
  },
  colors: {
    purple: "rgb(143 68 217)",
    washedBlack: "rgba(0, 0, 0, 0.54)",
    black: "rgb(0, 0, 0)",
    hoverPurple: "rgb(243, 234, 251)",
  },
  menu: {
    paper: {
      style: {
        borderRadius: "15px",
      },
    },
    root: {
      style: {
        position: "absolute",
        zIndex: 1099,
      },
    },
  },
  filterMenuList: {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "10px",
      padding: "8px",
    },
  },
  filterButtonSpacing: {
    marginRight: "15px",
  },
  menuItemHover: {
    "&:hover": {
      color: "rgb(143, 68, 217)",
      backgroundColor: "rgb(243, 234, 251)",
    },
  },
  menuItem: {
    borderRadius: "15px",
    height: "80px",
    justifyContent: "center",
    flexDirection: "column",
    gap: "10px",
    color: "rgba(0, 0, 0, 0.6)",
  },
  // Filter main menu //

  // Search //
  searchMenu: {
    transformOrigin: {
      horizontal: 25,
      vertical: "top",
    },
    slotProps: {
      root: {
        style: {
          marginTop: "5px",
        },
      },
      paper: {
        style: {
          borderRadius: "15px",
        },
      },
    },
  },
  searchTitle: {
    justifyContent: "center",
    pointerEvents: "none",
  },
  searchBar: {
    backgroundColor: "transparent",
    cursor: "default",
  },
  inputPropsIcon: {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton aria-label="search">
          <Search />
        </IconButton>
      </InputAdornment>
    ),
  },
  // Search //

  // Type //
  typeMenu: {
    transformOrigin: {
      horizontal: 15,
      vertical: "top",
    },
    slotProps: {
      root: {
        style: {
          marginTop: "5px",
        },
      },
      paper: {
        style: {
          borderRadius: "15px",
        },
      },
    },
  },
  typeMenuItem: {
    style: {
      backgroundColor: "transparent",
    },
    sx: {
      gap: 2,
      cursor: "default",
    },
  },
  typeButtonBase: {
    touchRippleProps: {
      style: {
        color: "rgb(143 68 217)",
      },
    },
    sx: {
      borderRadius: "16px",
    },
  },
  typeChip: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgb(243, 234, 251)",
    },
  },
  // Type //

  // Score //
  scoreMenu: {
    transformOrigin: {
      horizontal: 5,
      vertical: "top",
    },
    slotProps: {
      root: {
        style: {
          marginTop: "5px",
        },
      },
      paper: {
        style: {
          borderRadius: "15px",
        },
      },
    },
  },
  scoreMenuItem: {
    gap: "15px",
    justifyContent: "space-between",
    cursor: "default",
    marginBottom: "10px",
    "&:hover": {
      backgroundColor: "rgb(243, 234, 251)",
      color: "rgb(143 68 217)",
    },
  },
  // Score //

  // Date //
  dateMenu: {
    transformOrigin: {
      horizontal: 180,
      vertical: "top",
    },
    slotProps: {
      root: {
        style: {
          marginTop: "5px",
        },
      },
      paper: {
        style: {
          borderRadius: "15px",
        },
      },
    },
    menuListProps: {
      sx: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
    },
  },
  dateMenuItem: {
    style: {
      backgroundColor: "transparent",
      cursor: "default",
    },
    sx: {
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
  },
  // Date //
};

const Filter = () => {
  const filter = useSelector((state) => state.menu.filter);
  const filterMainMenuEl = useRef(null);

  const search = useSelector((state) => state.menu.showSearch);
  const showSearchEl = useRef(null);

  const showType = useSelector((state) => state.menu.showType);
  const showTypeEl = useRef(null);

  const showScore = useSelector((state) => state.menu.showScore);
  const showScoreEl = useRef(null);

  const showDate = useSelector((state) => state.menu.showDate);
  const showDateEl = useRef(null);

  const dispatch = useDispatch();

  return (
    <>
      <Button
        ref={filterMainMenuEl}
        startIcon={
          <FilterAlt
            sx={filter ? { color: filterStyles.colors.purple } : { color: filterStyles.colors.washedBlack }}
          />
        }
        onClick={() => dispatch(handleFilter({ type: "filter", isActive: true }))}
        sx={
          filter
            ? { ...filterStyles.filterButtonSpacing, color: filterStyles.colors.purple }
            : { ...filterStyles.filterButtonSpacing, color: filterStyles.colors.washedBlack }
        }>
        Filter
      </Button>

      {/* Filter main menu */}
      <Menu
        open={filter}
        anchorEl={filterMainMenuEl.current}
        slotProps={filterStyles.menu}
        MenuListProps={filterStyles.filterMenuList}
        onClose={() => dispatch(handleFilter({ type: "filter", isActive: false }))}>
        <MenuItem
          sx={{ ...filterStyles.menuItemHover, ...filterStyles.menuItem }}
          onClick={(e) => {
            showDateEl.current = e.target.parentElement;
            dispatch(handleFilter({ type: "showDate", isActive: true }));
          }}>
          <DateRange sx={filterStyles.disablePointers} />
          Date
        </MenuItem>

        <MenuItem
          sx={{ ...filterStyles.menuItemHover, ...filterStyles.menuItem }}
          onClick={(e) => {
            showScoreEl.current = e.target.parentElement;
            dispatch(handleFilter({ type: "showScore", isActive: true }));
          }}>
          <StarBorder sx={filterStyles.disablePointers} />
          Score
        </MenuItem>

        <MenuItem
          sx={{ ...filterStyles.menuItemHover, ...filterStyles.menuItem }}
          onClick={(e) => {
            showTypeEl.current = e.target.parentElement;
            dispatch(handleFilter({ type: "showType", isActive: true }));
          }}>
          <Tv sx={filterStyles.disablePointers} />
          Type
        </MenuItem>

        <MenuItem
          sx={{ ...filterStyles.menuItemHover, ...filterStyles.menuItem }}
          onClick={(e) => {
            showSearchEl.current = e.target.parentElement;
            dispatch(handleFilter({ type: "showSearch", isActive: true }));
          }}>
          <Search sx={filterStyles.disablePointers} />
          Search
        </MenuItem>
      </Menu>
      {/* Filter main menu */}

      {/* Search */}
      <Menu
        open={search}
        anchorEl={showSearchEl.current}
        onClose={() => dispatch(handleFilter({ type: "showSearch", isActive: false }))}
        transformOrigin={filterStyles.searchMenu.transformOrigin}
        slotProps={filterStyles.searchMenu.slotProps}>
        <MenuItem sx={filterStyles.searchTitle}>
          <Typography fontWeight={"Bold"}>Find Title</Typography>
        </MenuItem>

        <MenuItem disableRipple style={filterStyles.searchBar}>
          <TextField type="text" label="Enter title" InputProps={filterStyles.inputPropsIcon} />
        </MenuItem>
      </Menu>
      {/* Search */}

      {/* Type */}
      <Menu
        open={showType}
        anchorEl={showTypeEl.current}
        onClose={() => dispatch(handleFilter({ type: "showType", isActive: false }))}
        transformOrigin={filterStyles.typeMenu.transformOrigin}
        slotProps={filterStyles.typeMenu.slotProps}>
        <MenuItem sx={filterStyles.searchTitle}>
          <Typography fontWeight={"Bold"}>Select Types</Typography>
        </MenuItem>

        <MenuItem style={filterStyles.typeMenuItem.style} sx={filterStyles.typeMenuItem.sx} disableRipple>
          <ButtonBase
            sx={filterStyles.typeButtonBase.sx}
            TouchRippleProps={filterStyles.typeButtonBase.touchRippleProps}>
            <Chip label="TV" sx={filterStyles.typeChip} />
          </ButtonBase>

          <ButtonBase
            sx={filterStyles.typeButtonBase.sx}
            TouchRippleProps={filterStyles.typeButtonBase.touchRippleProps}>
            <Chip label="OVA" sx={filterStyles.typeChip} />
          </ButtonBase>

          <ButtonBase
            sx={filterStyles.typeButtonBase.sx}
            TouchRippleProps={filterStyles.typeButtonBase.touchRippleProps}>
            <Chip label="MOVIE" sx={filterStyles.typeChip} />
          </ButtonBase>
        </MenuItem>
      </Menu>
      {/* Type */}

      {/* Score */}
      <Menu
        open={showScore}
        anchorEl={showScoreEl.current}
        onClose={() => dispatch(handleFilter({ type: "showScore", isActive: false }))}
        transformOrigin={filterStyles.scoreMenu.transformOrigin}
        slotProps={filterStyles.scoreMenu.slotProps}>
        <MenuItem sx={filterStyles.searchTitle}>
          <Typography fontWeight={"Bold"}>Select score</Typography>
        </MenuItem>

        <MenuItem sx={filterStyles.scoreMenuItem}>
          From:
          <Rating value={5} />
        </MenuItem>

        <MenuItem sx={filterStyles.scoreMenuItem}>
          To:
          <Rating value={5} />
        </MenuItem>
      </Menu>
      {/* Score */}

      {/* Date */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Menu
          open={showDate}
          anchorEl={showDateEl.current}
          onClose={() => dispatch(handleFilter({ type: "showDate", isActive: false }))}
          transformOrigin={filterStyles.dateMenu.transformOrigin}
          slotProps={filterStyles.dateMenu.slotProps}
          MenuListProps={filterStyles.dateMenu.menuListProps}>
          <MenuItem sx={filterStyles.searchTitle}>
            <Typography fontWeight={"Bold"}>Select Date</Typography>
          </MenuItem>

          <MenuItem style={filterStyles.dateMenuItem.style} sx={filterStyles.dateMenuItem.sx} disableRipple>
            <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <DatePicker format="DD/MM/YYYY" label="From" />
              -
              <DatePicker format="DD/MM/YYYY" label="To" />
            </Box>
          </MenuItem>
        </Menu>
      </LocalizationProvider>
      {/* Date */}
    </>
  );
};

export default Filter;
