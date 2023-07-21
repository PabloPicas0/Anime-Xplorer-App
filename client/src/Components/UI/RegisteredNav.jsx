import { Button } from "@mui/material";

const pages = ["All anime", "Currently watching", "Completed", "Plan to watch"];

const registredStyles = {
  linksStyles: {
    color: "white",
    borderBottom: "1px solid transparent",
    borderRadius: 0,
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
    </>
  );
};

export default Registred;
