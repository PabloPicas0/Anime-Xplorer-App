import { Form, Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Alert, Box, Button, Snackbar, TextField } from "@mui/material";
import { RestartAltSharp } from "@mui/icons-material";

import url from "../Utils/api";
import { handleError } from "../Redux/Slices/statusSlice";

const changePassowrdStyles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  },
  formStyles: {
    display: "flex",
    flexDirection: "column",
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
  const [redirect, setRedirect] = useState(false);

  const status = useSelector((state) => state.status);

  const { userId } = useParams();

  const dispatch = useDispatch();

  const handlePassowrd = async () => {
    try {
      const request = await fetch(`${url}/api/login`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `userId=${userId}&password=${passowrds.newPassword}&password2=${passowrds.confirmNewPassowrd}`,
      });

      const response = await request.json();

      if (response.redirect) setRedirect(response.redirect);

      dispatch(
        handleError({
          error: response.error,
          errorMessage: response.status,
        })
      );

      console.log(response);
    } catch (error) {
      console.log(error);

      dispatch(
        handleError({
          error: true,
          errorMessage: [{ msg: "Something went wrong. Please try again later." }],
        })
      );
    }
  };

  if (!userId || redirect) return <Navigate to={"/login"} />;

  return (
    <Box sx={changePassowrdStyles.container}>
      <Snackbar open={status.error} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity="error">{status.errorMessage[0].msg}</Alert>
      </Snackbar>

      <h1>User id is {userId}</h1>

      <Form style={changePassowrdStyles.formStyles} onSubmit={handlePassowrd}>
        <TextField
          label="New password"
          autoComplete="on"
          type="password"
          fullWidth
          value={passowrds.newPassword}
          sx={changePassowrdStyles.formText}
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
          type="password"
          fullWidth
          value={passowrds.confirmNewPassowrd}
          sx={changePassowrdStyles.formText}
          onChange={(e) =>
            setPasswords((oldValues) => {
              const newValues = { ...oldValues };
              newValues.confirmNewPassowrd = e.target.value;

              return newValues;
            })
          }
        />

        <Box sx={{ textAlign: "center" }}>
          <Button variant="contained" type="submit" endIcon={<RestartAltSharp />}>
            Reset
          </Button>
        </Box>
      </Form>
    </Box>
  );
};

export default ChangePassowrd;
