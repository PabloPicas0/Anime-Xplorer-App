import { Box, Button, TextField } from "@mui/material";

import { useState } from "react";
import { Form } from "react-router-dom";

import url from "../Utils/api";

const recoverStyles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formStyles: {
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
};

const Recover = () => {
  const [email, setEmail] = useState("");
  const [emailNotExists, setEmailNotExists] = useState(false);

  const handleSubmit = async () => {
    const request = await fetch(`${url}/api/login/recover`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${email}`,
    });

    const response = await request.json()

    console.log(response)
  };

  return (
    <Box sx={recoverStyles.container}>
      <Form style={recoverStyles.formStyles} onSubmit={handleSubmit}>
        <h2 style={recoverStyles.formTitle}>Reset Password</h2>

        <TextField
          id="e-mail"
          label={emailNotExists ? "Error" : "E-mail"}
          name="email-recover"
          fullWidth
          required
          error={emailNotExists}
          helperText={emailNotExists ? "Incorrect email" : ""}
          margin="normal"
          autoComplete="on"
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
