import { Box, Button, TextField } from "@mui/material";

import { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import url from "../Utils/api";

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
      type: "text",
      value: "",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      value: "",
    },
  ]);
  const [status, setStatus] = useState({});

  const navigate = useNavigate();

  const handleChange = (event, index) => {
    setLoginFields((prevFields) => {
      const newFields = [...prevFields];
      newFields[index].value = event.target.value;

      return newFields;
    });
  };

  const handleSubmit = async () => {
    const reqest = await fetch(`${url}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `username=${loginFields[0].value}&password=${loginFields[1].value}`,
    });

    const response = await reqest.json();

    console.log(response);

    setStatus(response);

    if (!status.error) {
      setTimeout(() => {
        navigate("/home");
      }, 500);
    }
  };

  return (
    <Box sx={loginStyles.container}>
      <Form style={loginStyles.formStyles} onSubmit={handleSubmit}>
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
