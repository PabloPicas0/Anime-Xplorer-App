import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

import ErrorPage from "./Components/Routes/ErrorPage.jsx";
import Landing from "./Components/Routes/Landing.jsx";
import Login from "./Components/Routes/Login.jsx";
import SignUp from "./Components/Routes/SignUp.jsx";
import Recover from "./Components/Routes/Recover.jsx";

import { createTheme, ThemeProvider } from "@mui/material";

// Reminder
// You can use separate state np isLoaded for component to display domething else np. skeleton from mui

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/recover",
        element: <Recover />,
      },
    ],
  },
]);

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1100,
      xl: 1536,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
