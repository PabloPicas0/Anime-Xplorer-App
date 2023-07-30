import { Alert, Box, Button, Slide, TextField } from "@mui/material";
import { useState } from "react";

import { Form, Link, useNavigate } from "react-router-dom";
import url from "../Utils/api";
import { useDispatch, useSelector } from "react-redux";
import { handleStatus } from "../Redux/Slices/statusSlice";

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
  alert: {
    position: "fixed",
    top: 70,
  },
};

const SignUp = () => {
  const [signUpfields, setSignUpFields] = useState([
    {
      id: "e-mail",
      label: "E-mail",
      type: "email",
      value: "",
    },
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
    {
      id: "passwordComfirm",
      label: "Confirm Password",
      type: "password",
      value: "",
    },
  ]);
  const formStatus = useSelector((state) => state.status);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (event, index) => {
    setSignUpFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index].value = event.target.value;

      return updatedFields;
    });
  };

  const handleSubmit = async () => {
    try {
      const reqest = await fetch(`${url}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `email=${signUpfields[0].value}&username=${signUpfields[1].value}&password=${signUpfields[2].value}&password2=${signUpfields[3].value}`,
      });

      const response = await reqest.json();

      dispatch(handleStatus(response));

      if (!response.error) {
        setTimeout(() => {
          navigate("/login");
        }, 500);
      }
    } catch (error) {
      console.error(error);

      dispatch(
        handleStatus({
          error: true,
          status: [{ msg: "Unexpected error. Please try again later." }],
        })
      );
    }
  };

  return (
    <Box sx={singUpStyles.container}>
      <Slide direction="down" in={formStatus.error}>
        <Alert severity={formStatus.error ? "error" : "success"} sx={singUpStyles.alert}>
          {" "}
          {formStatus.status[0].msg}
        </Alert>
      </Slide>

      <Form style={singUpStyles.formStyles} onSubmit={handleSubmit}>
        <h2 style={singUpStyles.formTitle}>Sign up to AnimeExplorer</h2>

        {signUpfields.map((field, idx) => {
          const { id, label, type, value } = field;

          return (
            <TextField
              key={id}
              id={id}
              label={label}
              type={type}
              helperText={idx === 2 ? "Password need at least 6 characters" : ""}
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
