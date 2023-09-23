import { useDispatch, useSelector } from "react-redux";
import { handleSort } from "../Redux/Slices/menuSlice";
import { Button, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { North, SortSharp, South } from "@mui/icons-material";
import { useRef } from "react";

const sortStyles = {
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
  sortMenuList: {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
  },
  menuItemHover: {
    "&:hover": {
      color: "rgb(143, 68, 217)",
      backgroundColor: "rgb(243, 234, 251)",
    },
  },
};

const Sort = (props) => {
  const { setSortOrder } = props;

  const sort = useSelector((state) => state.menu.sort);
  const sortEl = useRef(null);

  const options = useSelector((state) => state.profile.profileFields.options[0]);
  const { darkMode } = options;

  const dispatch = useDispatch();

  return (
    <>
      <Button
        ref={sortEl}
        startIcon={
          <SortSharp
            sx={
              sort
                ? { color: sortStyles.colors.purple }
                : { color: darkMode ? "#fff" : sortStyles.colors.washedBlack }
            }
          />
        }
        sx={
          sort
            ? { color: sortStyles.colors.purple }
            : { color: darkMode ? "#fff" : sortStyles.colors.washedBlack }
        }
        onClick={(e) => {
          dispatch(handleSort(true));
        }}>
        Sort
      </Button>

      <Menu
        anchorEl={sortEl.current}
        open={sort}
        slotProps={sortStyles.menu}
        MenuListProps={sortStyles.sortMenuList}
        onClose={() => dispatch(handleSort(false))}>
        <MenuItem onClick={() => setSortOrder("asc")} sx={sortStyles.menuItemHover}>
          <ListItemIcon sx={{ color: "inherit" }}>
            <North />
          </ListItemIcon>
          <ListItemText sx={sortStyles.menuText}>Sort Ascending</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => setSortOrder("desc")} sx={sortStyles.menuItemHover}>
          <ListItemIcon sx={{ color: "inherit" }}>
            <South />
          </ListItemIcon>
          <ListItemText sx={sortStyles.menu}>Sort Descending</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Sort;
