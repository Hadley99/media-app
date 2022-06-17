import Login from "./routes/Login";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./routes/Home";
import { useDispatch } from "react-redux";
import { fetchUser } from "./redux/actions/userAction";
import Profile from "./routes/Profile";
import SinglePost from "./components/singlePost/SinglePost";
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes";
import ThemeProvider from "@mui/system/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import CssBaseline from "@mui/material/CssBaseline";

const App = () => {
  const [themeToggler, setThemeToggler] = useState(true);
  const handleThemeToggler = () => {
    setThemeToggler((prev) => !prev);
  };
  // primary: {
  //   main: "#67aa9a",
  //   light: "#c3ffff",
  //   dark: "#5ebaa4",
  //   contrastText: "#fff",
  // },
  const theme = createTheme({
    palette: {
      mode: themeToggler ? "dark" : "light",
      primary: {
        //orangeish red shade
        main: !themeToggler ? "#7986cb" : "#e1a242",
        light: !themeToggler ? "#aab6fe" : "#ffd371",
        dark: !themeToggler ? "#49599a" : "#ab730d",
        //light yellow shade
        // main: "#ffcc80",
        // light: "#ffffb0",
        // dark: "#ca9b52",

        //dark yellow shade
        // main: "#e1a242",
        // light: "#ffd371",
        // dark: "#ab730d",
        //  contrastText: "#fff",
      },

      secondary: {
        main: "#f2efc4",
        light: "#fffff7",
        dark: "#bfbd93",
      },

      success: {
        main: "#1d7156",
        light: "#51a083",
        dark: "#00452d",
      },
      error: {
        main: "#c55b47",
        light: "#fc8a73",
        dark: "#8f2d1f",
      },
    },
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <Router>
          <Navbar
            handleThemeToggler={handleThemeToggler}
            themeToggler={themeToggler}
          />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<AuthenticatedRoutes />}>
              <Route exact path="/" element={<Home />} />
              <Route path="/user/:id" element={<Profile />} />
              <Route path="/post/:postid" element={<SinglePost />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
