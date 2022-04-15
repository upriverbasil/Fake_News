import React, { useEffect } from "react";
import {
  AppBar,
  Typography,
  CircularProgress,
  Grid,
  Image,
  Divider,
  ButtonBase,
} from "@material-ui/core";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import FakeNews from "../fakeNews/FakeNews";
import { useNavigate, useLocation } from "react-router-dom";

const Trending = () => {
  const classes = useStyles();
  const trendingList = useSelector((state) => state.fakeNews)?.trending?.data;
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(trendingList.length, "ooooo");
  }, [trendingList]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Typography variant="h4">Trending</Typography>
      <Divider style={{ margin: "10px 0 20px 0" }} />
      {!trendingList?.length ? (
        <CircularProgress alightItems="center" />
      ) : (
        trendingList.map((news) => (
          <Grid key={news._id} item direction="row">
            <div className={classes.trendingitem}>
              <ButtonBase onClick={()=>{navigate(`/fake-news/${news._id}`)}}  className={classes.link}>
                <div className={classes.item}>
                  <img
                    style={{ objectFit: "cover" }}
                    height="100px"
                    width="100%"
                    src={
                      news.topImage
                        ? news.topImage.startsWith("https://")
                          ? news.topImage
                          : "https://" + news.topImage
                        : news.imageLinks
                        ? news.imageLinks[0].startsWith("https://")
                          ? news.imageLinks[0]
                          : "https://" + news.imageLinks[0]
                        : "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                    }
                  />
                </div>
                <div className={classes.item} style={{ marginBottom: "30px" }}>
                  <Typography variant="h6" display="block">
                    {news.title}
                  </Typography>
                </div>
                </ButtonBase>
            </div>
          </Grid>
        ))
      )}
    </AppBar>
  );
};

export default Trending;
