import { Person } from "@mui/icons-material";
import { Button, IconButton, MenuItem, Typography } from "@mui/material";

const pages = ["All anime", "Currently watching", "Completed", "Plan to watch"];

const registredStyles = {
  linksStyles: {
    color: "white",
    display: "block",
    borderBottom: "1px solid transparent",
    borderRadius: 0,
  },
  heroIcon: {
    color: "white",
    alignSelf: "center",
  },
};

const Registred = () => {
  return (
    <>
      {pages.map((page) => {
        return (
          <Button key={page} sx={registredStyles.linksStyles}>
            {page}
          </Button>
        );
      })}

      <IconButton sx={registredStyles.heroIcon} size="large">
        <Person />
      </IconButton>
    </>
  );
};

export default Registred;
