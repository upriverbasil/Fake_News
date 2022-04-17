import React, { useEffect } from "react";
import { Grid, CircularProgress, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

import FakeNews from "./fakeNewsItem/FakeNewsItem";
import useStyles from "./styles";

const Fakenews = () => {
  const { fakenews, isLoading } = useSelector((state) => state.fakeNews);
  const classes = useStyles();

  if (!fakenews.length && !isLoading)
    return <Typography style={{ textAlign: 'center' }} variant="h4">No results</Typography>;

  return isLoading ? (
    <CircularProgress alightItems="center" />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {fakenews.map((news) => (
        <Grid key={news._id} item xs={12} sm={12} md={6} lg={3}>
          <FakeNews news={news} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Fakenews;
