import React, { useEffect, useState } from "react";
import {
  Grid,
  Grow,
  Container,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import FakeNews from "../fakeNews/FakeNews";
import Pagination from "../Pagination/Pagination";
import SearchPagination from "../SearchPagination/SearchPagination";
import Trending from "../Trending/Trending";
import { getFakeNews, trending } from "../../actions/fakeNews";
import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const query = useQuery();
  const page = query.get("page") || 1;

  useEffect(() => {
    dispatch(trending());
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
            {console.log(useLocation().pathname)}
            {useLocation().pathname == "/fake-news" ? (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} variant="outlined" shape="rounded" />
              </Paper>
            ) : ( <></>
              // <Paper className={classes.pagination} elevation={6}>
              //   <SearchPagination page={page} variant="outlined" shape="rounded" />
              // </Paper>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Trending />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
