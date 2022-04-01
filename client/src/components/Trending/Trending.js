import React, { useEffect } from "react";
import { AppBar, Typography, CircularProgress, Grid } from "@material-ui/core";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import FakeNews from "../fakeNews/FakeNews";

const Trending = () => {
  const classes = useStyles();
  const trending = useSelector((state)=>(state.fakeNews))?.trending?.data

  useEffect(() => {
    console.log(trending, "ooooo");
  }, [trending]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Typography variant="h5">Trending</Typography>
      {!trending?.length ? (
        <CircularProgress alightItems="center" />
      ) : (
          <ol>
          {trending.map((news) => (
            <Grid key={news._id} item>
              <li className={classes.marginItem}><a href={news.articleLink} className={classes.link}><Typography display="block">{news.title}</Typography></a></li>
            </Grid>
          ))}
          </ol>
      )}
    </AppBar>
  );
};

export default Trending;
