import { Person } from "@mui/icons-material";
import { Button, IconButton, Tooltip, Zoom } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { changeNav } from "../State/isSettingsSlice";
import { Link } from "react-router-dom";

const pages = ["All anime", "Currently watching", "Completed", "Plan to watch"];

const registredStyles = {
  homeStyles: {
    links: {
      color: "white",
      borderBottom: "1px solid transparent",
      borderRadius: 0,
    },
  },
  settingsStyles: {
    links: {
      alignSelf: "center",
    },
    icon: {
      color: "whitesmoke",
    },
  },
};

const Registred = () => {
  const isSettings = useSelector((state) => state.isSettings);
  const dispatch = useDispatch();

  return (
    <>
      {isSettings ? (
        <Link to={"/home"} style={registredStyles.settingsStyles.links}>
          <Tooltip TransitionComponent={Zoom} title="Home Page" arrow>
            <IconButton onClick={() => dispatch(changeNav())} sx={registredStyles.settingsStyles.icon}>
              <Person />
            </IconButton>
          </Tooltip>
        </Link>
      ) : (
        pages.map((page) => {
          return (
            <Button key={page} sx={registredStyles.homeStyles.links}>
              {page}
            </Button>
          );
        })
      )}
    </>
  );
};

export default Registred;
