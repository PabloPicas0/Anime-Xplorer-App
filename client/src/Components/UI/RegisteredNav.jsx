import { Button } from "@mui/material";

const pages = ["All anime", "Currently watching", "Completed", "Plan to watch"];

const registredStyles = {
  links: {
    display: { xs: "none", md: "inline-flex" },
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
          <Button key={page} sx={registredStyles.links}>
            {page}
          </Button>
        );
      })}
    </>
  );
};

export default Registred;
