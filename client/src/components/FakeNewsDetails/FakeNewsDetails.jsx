import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Grid,
} from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";

import { getFakeNewsItem } from "../../actions/fakeNews";
import useStyles from "./styles";

const FakeNewsDetails = () => {
  const fakenewsitem = useSelector((state) => {
    return state?.fakeNews;
  })?.fakenewsitem;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

  let newsImage = "";

  if (fakenewsitem?.topImage) {
    if (fakenewsitem.topImage.startsWith("https://"))
      newsImage = fakenewsitem.topImage;
    else newsImage = "https://" + fakenewsitem.topImage;
  } else if (fakenewsitem?.imageLinks?.length > 0) {
    if (fakenewsitem.imageLinks[0].startsWith("https://"))
      newsImage = fakenewsitem.imageLinks[0];
    else newsImage = "https://" + fakenewsitem.imageLinks[0];
  }

  useEffect(() => {
    dispatch(getFakeNewsItem(id));
  }, [id]);

  return !fakenewsitem ? (
    <div></div>
  ) : (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={8}>
            <div className={classes.section}>
              <Typography variant="h3" component="h2">
                {fakenewsitem?.title}
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                color="textSecondary"
                component="h2"
              >
                {fakenewsitem.tags
                  ? fakenewsitem.tags.map((tag) => `#${tag} `)
                  : "NO TAGS"}
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                {fakenewsitem?.summary
                  ? fakenewsitem?.summary
                  : fakenewsitem?.content}
              </Typography>
              <Typography variant="h6">
                Created by: {fakenewsitem.authorName}
              </Typography>
              <Typography variant="body1">
                {moment(
                  fakenewsitem.publishDate,
                  "DD-MM-YYYY HH:mm:ss"
                ).fromNow()}
              </Typography>
              <Divider style={{ margin: "20px 0" }} />
              <Typography variant="body1">
                <strong>Comments - coming soon!</strong>
              </Typography>
              <Divider style={{ margin: "20px 0" }} />
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <div className={classes.imageSection}>
              {newsImage != "" ? (
                <img
                  className={classes.media}
                  src={newsImage}
                  alt={fakenewsitem?.title}
                />
              ) : (
                <></>
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default FakeNewsDetails;
