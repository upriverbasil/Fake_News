import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CardActionArea,
  ButtonBase,
} from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { useDispatch} from "react-redux";
import moment from "moment";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltOutlined from "@material-ui/icons/ThumbDownAltOutlined";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import DeleteIcon from '@material-ui/icons/Delete';
import { likeNews, dislikeNews,getFakeNewsItem, deleteNews} from "../../../actions/fakeNews";
import useStyles from "./styles";
import { useNavigate, useLocation} from "react-router-dom";

const FakeNewsItem = ({ news }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));
  const location = useLocation();

  const Likes = () => {
    if (news.upvotes.length > 0) {
      return news.upvotes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {news.upvotes.length > 2
            ? `You and ${news.upvotes.length - 1} others`
            : `${news.upvotes.length} like${
                news.upvotes.length > 1 ? "s" : ""
              }`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{news.upvotes.length}{" "}
          {news.upvotes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const DisLikes = () => {
    if (news.downvotes.length > 0) {
      return news.downvotes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbDownAltIcon fontSize="small" />
          &nbsp;
          {news.downvotes.length > 2
            ? `You and ${news.downvotes.length - 1} others`
            : `${news.downvotes.length} Dislike${
                news.downvotes.length > 1 ? "s" : ""
              }`}
        </>
      ) : (
        <>
          <ThumbDownAltOutlined fontSize="small" />
          &nbsp;{news.downvotes.length}{" "}
          {news.downvotes.length === 1 ? "DisLike" : "DisLikes"}
        </>
      );
    }

    return (
      <>
        <ThumbDownAltOutlined fontSize="small" />
        &nbsp;DisLike
      </>
    );
  };

  const openFakeNews = () => {
    navigate(`/fake-news/${news._id}`);
  }

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openFakeNews}>
        <CardMedia
          className={classes.media}
          image={
            news.topImage != null
              ? news.topImage.startsWith("https://")
                ? news.topImage
                : "https://" + news.topImage
              : news.imageLinks == null
              ? "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              : (news.imageLinks[0].startsWith("https://")
                  ? news.imageLinks[0]
                  : "https://" + news.imageLinks[0]) ||
                "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={news.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{toTitleCase(news.websiteName)}</Typography>
          <Typography variant="body2">
            {moment(news.publishDate, "DD-MM-YYYY HH:mm:ss").fromNow()}
          </Typography>
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {news.tags == null ? "No tags" : news.tags.map((tag) => `#${tag.split(' ').join('_')} `)}
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
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => dispatch(likeNews(news._id))}
        >
          <Likes />
        </Button>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => dispatch(dislikeNews(news._id))}
        >
          <DisLikes />
          
        </Button>
        <Button size="small" color="primary" onClick={()=>{dispatch(deleteNews(news._id)); window.location.reload()}}><DeleteIcon fontSize="small" /> Delete</Button>
      </CardActions>
    </Card>
  );
};

export default FakeNewsItem;
