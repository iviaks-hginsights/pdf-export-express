import React from "react";
import {
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

// import "fontsource-roboto";

const useStyles = makeStyles((theme) => ({
  root: {
    fontWeight: "bold",
  },
  articleHeader: {
    paddingTop: "15px",
  },
  paper: {
    padding: "10px",
  },
  button: {
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <div>
      <Container maxWidth="sm">
        <Paper className={classes.paper}>
          <Grid className={classes.gridContainer} container xs={12} spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h3">Page title</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider orientation="horizontal" />
              <Typography className={classes.articleHeader} variant="h5">
                Article header
              </Typography>
              <Typography align="justify">
                React has been a GOOD option for the past few years, mainly due
                to create-react-app, the ease of use, and the “no-bullshit”
                configuration. Over time as I feel like I’ve grasped a concept
                better, a new one keeps popping up, and this time around we’re
                dealing with server side rendering. Having been in
                infrastructure and built websites a plenty, (both frontend and
                backend) I thought this would be a breeze. Boy was I wrong
                however. It ended in infuriating battles with tools I didn’t
                want to understand, configuration files I didn’t want to touch
                and problems I REALLY didn’t want to solve. In time though, the
                “go to sleep” tactic worked pretty well for clearness and
                understanding.
              </Typography>
              <Button
                className={classes.root}
                color="secondary"
                variant="contained"
              >
                Button1
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default App;
