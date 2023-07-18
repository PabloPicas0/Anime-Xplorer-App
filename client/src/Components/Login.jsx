import { Box, Button, TextField } from "@mui/material";
import { Form, Link } from "react-router-dom";

const loginStyles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
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
  linkWrapperStyles: {
    marginTop: "20px",
  },
  link: {
    color: "blue",
    fontWeight: 100,
  },
};

const Login = () => {
  return (
    <Box sx={loginStyles.container}>
      <Form style={loginStyles.formStyles}>
        <h2 style={loginStyles.formTitle}>Login to AnimeExplorer</h2>
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

        <Box sx={loginStyles.formButton}>
          <Button type="submit" variant="contained">
            Login
          </Button>

          <div style={loginStyles.linkWrapperStyles}>
            <Link to={`/recover`} style={loginStyles.link}>
              Forgot password ?
            </Link>
          </div>
        </Box>
      </Form>
    </Box>
  );
};

export default Login;
