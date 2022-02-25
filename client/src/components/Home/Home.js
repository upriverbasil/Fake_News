import React, { useEffect } from "react";
import { Grid, Grow, Container, Paper } from "@material-ui/core";
import { useDispatch } from "react-redux";

import FakeNews from "../fakeNews/FakeNews";
import Pagination from "../Pagination/Pagination";
import Trending from "../Trending/Trending";
import { getFakeNews } from "../../actions/fakeNews";
import useStyles from "./styles";

const Home = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getFakeNews());
  }, [dispatch]);

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <FakeNews />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Trending />
            <Paper className={classes.pagination} elevation={6}>
              <Pagination />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
