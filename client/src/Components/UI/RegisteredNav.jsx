import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
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
  const currentStatus = useSelector((state) => state.profile.showBy);
  const options = useSelector((state) => state.profile.profileFields.options[0]);
  const { color } = options;

  const dispatch = useDispatch();

  return (
    <>
      {pages.map((page) => {
        return (
          <Button
            key={page}
            onClick={() => dispatch(handleUserSortingStatus(page))}
            sx={
              currentStatus === page
                ? {
                    ...registredStyles.links,
                    borderBottom: `1px solid ${color.toLowerCase() === "white" ? "black" : "white"}`,
                  }
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
