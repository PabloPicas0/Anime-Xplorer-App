import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

import { Form, Link } from "react-router-dom";
import url from "../Utils/api";

const singUpStyles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  linkWrapperStyles: {
    marginTop: "30px",
    textAlign: "center",
    fontWeight: 100,
  },
  link: {
    color: "blue",
    fontWeight: 100,
  },
};

const SignUp = () => {
  const [signUpfields, setSignUpFields] = useState([
    {
      id: "e-mail",
      label: "E-mail",
      name: "email",
      type: "email",
      value: "",
    },
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
    {
      id: "passwordComfirm",
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      value: "",
    },
  ]);

  const handleChange = (event, index) => {
    setSignUpFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index].value = event.target.value;

      return updatedFields;
    });
  };

  const handleSubmit = async (e) => {
    const req = await fetch(`${url}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${signUpfields[0].value}&username=${signUpfields[1].value}&password=${signUpfields[2].value}`,
    });

    console.log(req);
  };

  return (
    <Box sx={singUpStyles.container}>
      <Form style={singUpStyles.formStyles} onSubmit={handleSubmit}>
        <h2 style={singUpStyles.formTitle}>Sign up to AnimeExplorer</h2>

        {signUpfields.map((field, idx) => {
          const { id, label, name, type, value } = field;

          return (
            <TextField
              key={id}
              id={id}
              label={label}
              name={name}
              type={type}
              fullWidth
              required
              margin="normal"
              autoComplete="on"
              value={value}
              onChange={(e) => handleChange(e, idx)}
            />
          );
        })}

        <Box sx={singUpStyles.formButton}>
          <Button type="submit" variant="contained">
            Sign Up
          </Button>
        </Box>

        <div style={singUpStyles.linkWrapperStyles}>
          Already have an account ?{" "}
          <Link to={`/login`} style={singUpStyles.link}>
            Log in
          </Link>
        </div>
      </Form>
    </Box>
  );
};

export default SignUp;
