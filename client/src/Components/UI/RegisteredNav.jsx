import { Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { handleUserSortingStatus } from "../Redux/Slices/profileSclice";

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
  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useDispatch();

  return (
    <>
      {pages.map((page, idx) => {
        return (
          <Button
            key={page}
            onClick={() => {
              setCurrentPage(idx);
              dispatch(handleUserSortingStatus(page));
            }}
            sx={
              currentPage === idx
                ? { ...registredStyles.links, borderBottom: "1px solid white" }
                : { ...registredStyles.links }
            }>
            {page}
          </Button>
        );
      })}
    </>
  );
};

export default Registred;
