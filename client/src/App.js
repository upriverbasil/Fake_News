import React, { useEffect } from "react";
import { Container, Typography, Grid, AppBar, Grow } from "@material-ui/core";
import { useDispatch } from "react-redux";

import fake_news from "./images/fakenews.png";

import FakeNews from "./components/fakeNews/FakeNews";
import Trending from "./components/Trending/Trending";
import { getFakeNews } from "./actions/fakeNews";

import useStyles from "./styles";

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFakeNews());
  }, [dispatch]);

  return (
    <Container>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <img
          className={classes.image}
          src={fake_news}
          alt="fake News"
          height="40"
        />
        &nbsp; &nbsp; &nbsp; 
        <Typography className={classes.heading} variant="h3" align="center">
          FAKE NEWS
        </Typography>
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <FakeNews />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Trending />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};
export default App;
