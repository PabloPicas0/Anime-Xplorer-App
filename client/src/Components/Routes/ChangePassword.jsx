import { useParams } from "react-router-dom";

import { Box, Button, TextField } from "@mui/material";

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

    <Button variant="contained">Submit</Button>
    </Box>
  );
};

export default ChangePassowrd;
