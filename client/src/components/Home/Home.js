import React, { useEffect, useState } from "react";
import { Grid, Grow, Container, Paper, AppBar, TextField, Button } from "@material-ui/core";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import FakeNews from "../fakeNews/FakeNews";
import Pagination from "../Pagination/Pagination";
import Trending from "../Trending/Trending";
import { getFakeNews, getFakeNewsBySearch } from "../../actions/fakeNews";
import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const [ search, setSearch ] = useState('');

  useEffect(() => {
    dispatch(getFakeNews());
  }, [dispatch]);

  const searchPost = () => {
    if (search.trim()) {
      dispatch(getFakeNewsBySearch( { search }))
      navigate(`/fake-news/search?searchQuery=${search || 'none'}`);
    } else {
      navigate('/');
    }
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  }

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
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField
                name="search"
                variant="outlined"
                label="Search Fake News"
                onKeyPress={handleKeyPress}
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
            </AppBar>
            <Trending />
            <Paper className={classes.pagination} elevation={6}>
              <Pagination page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
