import { Box, Button, TextField } from "@mui/material";

import { Form } from "react-router-dom";

const singUpStyles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  formStyles: {
    maxWidth: "486px",
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
};

const SignUp = () => {
  return (
    <Box sx={singUpStyles.container}>
      <Form style={singUpStyles.formStyles}>
        <h2 style={singUpStyles.formTitle}>Sign up to AnimeExplorer</h2>
        
        <TextField
          id="e-mail"
          label="E-mail"
          name="email"
          fullWidth
          required
          margin="normal"
          autoComplete="on"
        />
        <TextField
          id="username"
          label="Username"
          name="username"
          fullWidth
          required
          margin="normal"
          autoComplete="on"
        />
        <TextField
          id="password"
          label="Password"
          name="password"
          fullWidth
          required
          margin="normal"
          type="password"
          autoComplete="on"
        />
        <TextField
          id="passwordComfirm"
          label="Confirm Password"
          name="confimrPassword"
          fullWidth
          required
          margin="normal"
          type="password"
          autoComplete="on"
        />

        <Box sx={singUpStyles.formButton}>
          <Button type="submit" variant="contained">
            Sign Up
          </Button>
        </Box>
      </Form>
    </Box>
  );
};

export default SignUp;
