import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

import ErrorPage from "./Components/Routes/Validated/ErrorPage.jsx";
import Landing from "./Components/Routes//Unvalidated/Landing.jsx";
import Login from "./Components/Routes/Unvalidated/Login.jsx";
import SignUp from "./Components/Routes/Unvalidated/SignUp.jsx";
import Recover from "./Components/Routes//Unvalidated/Recover.jsx";
import Home from "./Components/Routes/Validated/Home.jsx";
import ChangePassowrd from "./Components/Routes/Validated/ChangePassword.jsx";

import Theme from "./Components/Theme/Theme.jsx";
import Settings from "./Components/Routes/Validated/Settings.jsx";

import { Provider as StateProvider } from "react-redux";
import { ScopedCssBaseline } from "@mui/material";
import store from "./Components/Redux/Store/Store.js";
import url from "./Components/Utils/api.js";

const router = createHashRouter([
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
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "recover",
        element: <Recover />,
      },
      {
        path: "recover/:userId",
        element: <ChangePassowrd />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "user/:name",
        loader: async ({ params }) => {
          const request = await fetch(`${url}/api/users`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: `user=${params.name}`,
          });

          const response = await request.json();

          return response;
        },
        element: <Home />,
      },
    ],
  },
  {
    path: "settings",
    element: <Settings />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateProvider store={store}>
      <Theme>
        <ScopedCssBaseline enableColorScheme>
          <RouterProvider router={router} />
        </ScopedCssBaseline>
      </Theme>
    </StateProvider>
  </React.StrictMode>
);
