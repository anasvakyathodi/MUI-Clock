import React, { useState, useEffect } from "react";
import ReactGA from "react-ga";
import {
  Paper,
  Typography,
  Switch,
  FormControlLabel,
  Grid,
  // CircularProgress,
} from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const options = {
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};
const getTime = () => {
  return new Date().toLocaleString("en-US", options);
};
ReactGA.initialize("UA-168778602-8");
ReactGA.pageview("/");
function App() {
  const getMode = () => {
    const initialMode = localStorage.getItem("mode");
    if (initialMode == null)
      if (matchMedia("(prefers-color-scheme:dark)").matches) return true;
      else return false;
    else return JSON.parse(initialMode);
  };
  // const [ready, setReady] = useState(false);
  const [dark, setDark] = useState(getMode);

  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(dark));
  }, [dark]);

  const LightTheme = createMuiTheme({
    palette: {
      type: "light",
      primary: {
        main: "#0f4c75",
        contrastText: "#1b262c",
      },
      background: {
        paper: "#bbe1fa",
      },
    },
  });

  const DarkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#bbe1fa",
      },
      secondary: {
        main: "#0f4c75",
      },
      background: {
        paper: "#1b262c",
      },
    },
  });

  const [clock, setClock] = useState(getTime());

  useEffect(() => {
    const intervalID = setInterval(() => setClock(getTime()), 1000);
    // document.onreadystatechange = function () {
    //   if (document.readyState === "complete") {
    //     setReady(true);
    //   }
    // };
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  const getClock = () => {
    return (
      <Grid
        container
        alignItems="center"
        direction="column"
        justify="space-between"
        fullWidth
        style={{ height: `100%` }}
      >
        <Grid item>
          <FormControlLabel
            control={<Switch checked={dark} onChange={() => setDark(!dark)} />}
            label={dark ? "Dark" : "Light"}
            labelPlacement="top"
            style={{ marginTop: "2rem" }}
            color="primary"
          />
        </Grid>
        <Grid item>
          <Typography variant="h1" color="primary">
            {clock}
          </Typography>
        </Grid>
        <Grid item>
          <Typography color="primary" style={{ marginBottom: "2rem" }}>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
            })}
          </Typography>
        </Grid>
      </Grid>
    );
  };
  // const goLoading = () => {
  //   return (
  //     <Grid
  //       container
  //       spacing={0}
  //       direction="column"
  //       alignItems="center"
  //       justify="center"
  //       style={{ minHeight: "100vh" }}
  //     >
  //       <Grid item>
  //         <CircularProgress color="primary" />
  //       </Grid>
  //     </Grid>
  //   );
  // };
  return (
    <ThemeProvider theme={dark ? DarkTheme : LightTheme}>
      <Paper
        component="div"
        fullWidth
        square
        style={{ height: `${window.innerHeight}px`, transition: "all 0.5s linear" }}
      >

        {getClock()}
      </Paper>
    </ThemeProvider>
  );
}

export default App;
