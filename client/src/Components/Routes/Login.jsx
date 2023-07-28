import { Alert, Box, Button, Slide, TextField } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { handleStatus, handleValue } from "../Redux/Slices/LoginSclice";

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
  alert: {
    position: "fixed",
    top: 70,
  },
};

const Login = () => {
  const loginFields = useSelector((state) => state.login.loginFields);
  const status = useSelector((state) => state.login.status);
  
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const reqest = await fetch(`${url}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `username=${loginFields[0].value}&password=${loginFields[1].value}`,
      });

      const response = await reqest.json();

      dispatch(handleStatus(response));

      if (!response.error) {
        setTimeout(() => {
          navigate("/home");
        }, 500);
      }
    } catch (error) {
      console.log(error);

      dispatch(
        handleStatus({
          error: true,
          status: [{ msg: "Unexpected error. Please try again later." }],
        })
      );
    }
  };

  return (
    <Box sx={loginStyles.container}>
      {Object.keys(status).length === 0 ? null : (
        <Slide direction="down" in={status.error}>
          <Alert severity={status.error ? "error" : "success"} sx={loginStyles.alert}>
            {" "}
            {status.status[0].msg}
          </Alert>
        </Slide>
      )}

      <Form style={loginStyles.formStyles} onSubmit={handleSubmit}>
        <h2 style={loginStyles.formTitle}>Login to AnimeExplorer</h2>

        {loginFields.map((field, idx) => {
          const { id, label, type, value } = field;

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
              onChange={(e) => dispatch(handleValue({ index: idx, event: e }))}
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
