import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Form, Link } from "react-router-dom";

const loginStyles = {
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
  linkWrapperStyles: {
    marginTop: "20px",
  },
  link: {
    color: "blue",
    fontWeight: 100,
  },
};

const Login = () => {
  const [loginFields, setLoginFields] = useState([
    {
      id: "username",
      label: "Username",
      name: "username",
      type: "text",
      value: "",
    },
    {
      id: "password",
      label: "Password",
      name: "password",
      type: "password",
      value: "",
    },
  ]);

  const handleChange = (event, index) => {
    setLoginFields((prevFields) => {
      const newFields = [...prevFields];
      newFields[index].value = event.target.value;

      return newFields;
    });
  };

  return (
    <Box sx={loginStyles.container}>
      <Form style={loginStyles.formStyles}>
        <h2 style={loginStyles.formTitle}>Login to AnimeExplorer</h2>

        {loginFields.map((field, idx) => {
          const { id, label, name, type, value } = field;

          return (
            <TextField
              key={id}
              id={id}
              label={label}
              fullWidth
              required
              margin="normal"
              autoComplete="on"
              type={type}
              value={value}
              name={name}
              onChange={(e) => handleChange(e, idx)}
            />
          );
        })}

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
