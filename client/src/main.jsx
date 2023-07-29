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
import Home from "./Components/Routes/Home.jsx";

import { Theme as ThemeProvider } from "./Components/Theme/Theme.jsx";
import Settings from "./Components/Routes/Settings.jsx";

import { Provider as StateProvider } from "react-redux";
import store from "./Components/Redux/Store/Store.js";

// Reminder
// You can use separate state np isLoaded for component to display domething else np. skeleton from mui

// TODO
// Configure server authentication with OAuth or JWT
// If user is authenticated or logined in send data to store with anime
// Store client options in DB or in local storage

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
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
  {
    path: "/settings",
    element: <Settings />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateProvider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </StateProvider>
  </React.StrictMode>
);
