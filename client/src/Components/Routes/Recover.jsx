import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Form } from "react-router-dom";

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

  return (
    <Box sx={recoverStyles.container}>
      <Form style={recoverStyles.formStyles}>
        <h2 style={recoverStyles.formTitle}>Reset Password</h2>

        <TextField
          id="e-mail"
          label="E-mail"
          name="email-recover"
          fullWidth
          required
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
