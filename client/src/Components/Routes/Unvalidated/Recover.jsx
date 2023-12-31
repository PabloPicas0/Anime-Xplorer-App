import { Alert, Box, Button, Slide, TextField } from "@mui/material";

import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

import url from "../../Utils/api";
import { useDispatch, useSelector } from "react-redux";
import { handleError } from "../../Redux/Slices/statusSlice";

const recoverStyles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formStyles: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "0px 20px",
  },
  formTitle: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  formButton: {
    textAlign: "center",
    marginTop: "20px",
  },
  formText: {
    width: { xs: "223px", sm: "486px" },
  },
  alert: {
    position: "fixed",
    top: 70,
  },
};

const Recover = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const recoverStatus = useSelector((state) => state.status);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const request = await fetch(`${url}/api/login/recover`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `email=${email}&username=${username}`,
      });

      const response = await request.json();

      console.log(response);

      dispatch(
        handleError({
          error: response.error,
          errorMessage: response.status,
        })
      );

      if (!response.error) {
        navigate(`/recover/${response.id}`);
      }
    } catch (error) {
      console.error(error);
      dispatch(
        handleError({
          error: true,
          errorMessage: [{ msg: "Something went worng. Please try again later." }],
        })
      );
    }
  };

  return (
    <Box sx={recoverStyles.container}>
      <Slide in={recoverStatus.error}>
        <Alert severity="error" sx={recoverStyles.alert}>
          {recoverStatus.errorMessage[0].msg}
        </Alert>
      </Slide>

      <Form style={recoverStyles.formStyles} onSubmit={handleSubmit}>
        <h2 style={recoverStyles.formTitle}>Reset Password</h2>

        <TextField
          id="username"
          label="Username"
          fullWidth
          required
          margin="normal"
          autoComplete="on"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={recoverStyles.formText}
        />

        <TextField
          id="e-mail"
          label="E-mail"
          fullWidth
          required
          margin="normal"
          autoComplete="on"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          sx={recoverStyles.formText}
        />

        <Box sx={recoverStyles.formButton}>
          <Button type="submit" variant="contained">
            Reset
          </Button>
        </Box>
      </Form>
    </Box>
  );
};

export default Recover;
