import { Button } from "@mui/material";

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
  return (
    <>
      {pages.map((page) => {
        return (
          <Button key={page} sx={registredStyles.homeStyles.links}>
            {page}
          </Button>
        );
      })}
    </>
  );
};

export default Registred;
