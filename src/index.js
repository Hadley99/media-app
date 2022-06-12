import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/system/ThemeProvider";
import { deepOrange } from "@mui/material/colors";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#67aa9a",
      light: "#c3ffff",
      dark: "#5ebaa4",
      contrastText: "#fff",
    },

    secondary: {
      main: "#0000",
      light: "#2c2c2c",
      dark: "#000",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </Provider>
);
