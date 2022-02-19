import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardActionArea,
} from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { useDispatch } from "react-redux";
import moment from "moment";

import { likeNews, dislikeNews } from "../../../actions/fakeNews";
import useStyles from "./styles";

const FakeNewsItem = ({ news }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Card className={classes.card}>
      <CardActionArea href={news.articleLink} target="_blank">
        <CardMedia
          className={classes.media}
          image={
            news.imageLinks == null
              ? "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              : "https://" + news.imageLinks[0] ||
                "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={news.title}
        />
      </CardActionArea>
      <div className={classes.overlay}>
        <Typography variant="h6">{news.authorName}</Typography>
        <Typography variant="body2">
          {moment(news.publishDate, "DD-MM-YYYY HH:mm:ss").fromNow()}
        </Typography>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {news.tags == null ? "No tags" : news.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {news.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {news.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(likeNews(news._id))}
        >
          <ArrowUpwardIcon fontSize="small" /> &nbsp; {news.upvoteCount}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(dislikeNews(news._id))}
        >
          <ArrowDownwardIcon fontSize="small" /> &nbsp; {news.downvoteCount}
        </Button>
      </CardActions>
    </Card>
  );
};

export default FakeNewsItem;
