import React, { useEffect } from "react";
import { AppBar, Typography, CircularProgress, Grid, Image} from "@material-ui/core";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import FakeNews from "../fakeNews/FakeNews";

const Trending = () => {
  const classes = useStyles();
  const trending = useSelector((state)=>(state.fakeNews))?.trending?.data

  useEffect(() => {
    // console.log(trending, "ooooo");
  }, [trending]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Typography variant="h5">Trending</Typography>
      {!trending?.length ? (
        <CircularProgress alightItems="center" />
      ) : (
          <ol>
          {trending.map((news) => (
            <Grid key={news._id} item direction="row">
              <div className={classes.trendingitem}>
                <li className={classes.marginItem}>
                  <a href={news.articleLink} className={classes.link}>
                      <div className={classes.item}>
                        <img height="50px" width="50px" src={news?.topImage ? news?.topImage : (news?.imageLinks[0]?news?.imageLinks[0]:"https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png")}></img>
                      </div>
                      <div className={classes.item}>
                      <Typography display="block">{news.title}</Typography>
                      </div>
                    </a>
                </li>
              </div>
            </Grid>
          ))}
          </ol>
      )}
    </AppBar>
  );
};

export default Trending;
