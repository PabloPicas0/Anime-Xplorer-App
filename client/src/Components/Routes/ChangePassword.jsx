import { Navigate, useParams } from "react-router-dom";
import { useState } from "react";

import { Alert, Box, Button, Snackbar, TextField } from "@mui/material";
import { RestartAltSharp } from "@mui/icons-material";

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
  const [passowrds, setPasswords] = useState({
    newPassword: "",
    confirmNewPassowrd: "",
  });

  const { userId } = useParams();

  const handlePassowrd = async () => {
    try {
      const request = await fetch(`${url}/api/login`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `userId=${userId}&password=${passowrds.newPassword}&password2=${passowrds.confirmNewPassowrd}`,
      });

      const response = await request.json()

      console.log(response)
    } catch (error) {
      console.log(error);
    }
  };

  if (!userId) return <Navigate to={"/"} />;

  return (
    <Box sx={ChangePassowrdStyles.container}>
      <Snackbar
        open={false}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity="error">
          {"Open"}
        </Alert>
      </Snackbar>

      <h1>User id is {userId}</h1>

      <TextField
        label="New password"
        autoComplete="on"
        fullWidth
        sx={ChangePassowrdStyles.formText}
        value={passowrds.newPassword}
        onChange={(e) =>
          setPasswords((oldValues) => {
            const newValues = { ...oldValues };
            newValues.newPassword = e.target.value;

            return newValues;
          })
        }
      />

      <TextField
        label="Confirm new passowrd"
        autoComplete="on"
        fullWidth
        value={passowrds.confirmNewPassowrd}
        onChange={(e) =>
          setPasswords((oldValues) => {
            const newValues = { ...oldValues };
            newValues.confirmNewPassowrd = e.target.value;

            return newValues;
          })
        }
        sx={ChangePassowrdStyles.formText}
      />

      <Button variant="contained" onClick={handlePassowrd} endIcon={<RestartAltSharp />}>
        Reset
      </Button>
    </Box>
  );
};

export default ChangePassowrd;
