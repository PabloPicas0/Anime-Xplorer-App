import { Navigate, useParams } from "react-router-dom";

import { Box, Button, TextField } from "@mui/material";
import url from "../Utils/api";

const ChangePassowrdStyles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  },
  formText: {
    width: { xs: "223px", sm: "486px" },
  },
};

const ChangePassowrd = () => {
  const { userId } = useParams();

  const handlePassowrd = async () => {
    try {
      const request = await fetch(`${url}/api/login`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `userId=${userId}`,
      });
    } catch (error) {
      console.log(error)
    }
  };

  if (!userId) return <Navigate to={"/"} />;

  return (
    <Box sx={ChangePassowrdStyles.container}>
      <h1>User id is {userId}</h1>

      <TextField label="New password" autoComplete="on" fullWidth sx={ChangePassowrdStyles.formText} />
      <TextField
        label="Confirm new passowrd"
        autoComplete="on"
        fullWidth
        sx={ChangePassowrdStyles.formText}
      />

      <Button variant="contained" onClick={handlePassowrd}>Submit</Button>
    </Box>
  );
};

export default ChangePassowrd;
