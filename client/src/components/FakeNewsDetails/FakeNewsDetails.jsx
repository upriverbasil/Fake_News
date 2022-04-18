import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Grid,
  Button,
} from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

import { getFakeNewsItem, getRecommended } from "../../actions/fakeNews";
import useStyles from "./styles";
import { deleteNews } from "../../actions/fakeNews";
import FakeNews from "../fakeNews/fakeNewsItem/FakeNewsItem.js";
import { likeNews, dislikeNews } from "../../actions/fakeNews";
import CommentsSection from "./CommentsSection";

import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltOutlined from "@material-ui/icons/ThumbDownAltOutlined";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";

const FakeNewsDetails = () => {
  const fakenewsitem = useSelector((state) => {
    return state?.fakeNews;
  })?.fakenewsitem;

  const recommended = useSelector((state) => {
    {
      return state?.fakeNews;
    }
  })?.recommendednews;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const location = useLocation();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("profile"));
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

  const recommendedPosts = recommended
    ? recommended.filter(({ _id }) => _id !== fakenewsitem._id)
    : null;
  useEffect(() => {
    dispatch(getFakeNewsItem(id));
  }, [id]);
  useEffect(() => {
    if (fakenewsitem) {
      console.log("pppp", fakenewsitem?.tags);
      dispatch(
        getRecommended({ search: "none", tags: fakenewsitem?.tags?.join(",") })
      );
    }
  }, [fakenewsitem]);

  const openNews = (_id) => {
    navigate(`/fake-news/${_id}`);
  };
  const Likes = ({ news }) => {
    // console.log(news)
    if (news.upvotes.length > 0) {
      return news.upvotes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="large" />
          &nbsp;
          {news.upvotes.length > 2
            ? `You and ${news.upvotes.length - 1} others`
            : `${news.upvotes.length} like${
                news.upvotes.length > 1 ? "s" : ""
              }`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="large" />
          &nbsp;{news.upvotes.length}{" "}
          {news.upvotes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="large" />
        &nbsp;Like
      </>
    );
  };
  const DisLikes = ({ news }) => {
    console.log(news);
    if (news.downvotes.length > 0) {
      return news.downvotes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbDownAltIcon fontSize="large" />
          &nbsp;
          {news.downvotes.length > 2
            ? `You and ${news.downvotes.length - 1} others`
            : `${news.downvotes.length} Dislike${
                news.downvotes.length > 1 ? "s" : ""
              }`}
        </>
      ) : (
        <>
          <ThumbDownAltOutlined fontSize="large" />
          &nbsp;{news.downvotes.length}{" "}
          {news.downvotes.length === 1 ? "DisLike" : "DisLikes"}
        </>
      );
    }

    return (
      <>
        <ThumbDownAltOutlined fontSize="large" />
        &nbsp;DisLike
      </>
    );
  };
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
              {fakenewsitem.authorName ? (
                <Typography variant="h6">
                  Published by: {fakenewsitem?.authorName}
                </Typography>
              ) : (
                <></>
              )}
              <Typography variant="body1">
                {moment(
                  fakenewsitem?.publishDate,
                  "DD-MM-YYYY HH:mm:ss"
                ).fromNow()}
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                color="textSecondary"
                component="h2"
              >
                {fakenewsitem?.tags ? (
                  fakenewsitem.tags.map(
                    (tag) => `#${tag.split(" ").join("_")} `
                  )
                ) : (
                  <></>
                )}
              </Typography>

              <Typography gutterBottom variant="body1" component="p">
                {fakenewsitem?.summary
                  ? fakenewsitem?.summary
                  : fakenewsitem?.content}
              </Typography>

              <Typography variant="h6">
                <strong>
                  Read more on{" "}
                  <a href={fakenewsitem?.articleLink} target="_blank">
                    {fakenewsitem?.websiteName.split("_").join(" ")}
                  </a>
                  .
                </strong>
              </Typography>
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
          <Grid item xs={12} sm={6} md={4}>
            <Divider style={{ margin: "10px 0 20px 0" }} />
            {/* <Typography variant="h5"><strong>LIKE OR DISLIKE</strong></Typography> */}
            <Button
              size="large"
              color="primary"
              disabled={!user?.result}
              onClick={() => {
                dispatch(likeNews(fakenewsitem._id));
                window.location.reload();
              }}
            >
              <Likes news={fakenewsitem} />
            </Button>
            <Button
              size="large"
              color="primary"
              disabled={!user?.result}
              onClick={() => {
                dispatch(dislikeNews(fakenewsitem._id));
                window.location.reload();
              }}
            >
              <DisLikes news={fakenewsitem} />
            </Button>
            {user?.adminStatus ? (
              <Button
                size="large"
                color="primary"
                onClick={() => {
                  dispatch(deleteNews(fakenewsitem._id));
                  window.location.reload();
                }}
              >
                <DeleteIcon fontSize="large" /> Delete
              </Button>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <div className={classes.imageSection}>
              <Divider style={{ margin: "10px 0 20px 0" }} />
              <Typography variant="h5">
                <strong>Share this fake news with friends!</strong>
              </Typography>
              <FacebookShareButton
                url={window.location.href}
                quote={"Check out this fake news!"}
              >
                <FacebookIcon logoFillColor="white" round={true} />
              </FacebookShareButton>
              <TwitterShareButton
                url={window.location.href}
                title={"Check out this fake news!" + fakenewsitem?.title}
              >
                <TwitterIcon logoFillColor="white" round={true} />
              </TwitterShareButton>
              <WhatsappShareButton
                url={window.location.href}
                title={"Check out this fake news!" + fakenewsitem?.title}
              >
                <WhatsappIcon logoFillColor="white" round={true} />
              </WhatsappShareButton>
            </div>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <div className={classes.section}>
              <Divider style={{ margin: "0px 0 10px 0" }} />
              <CommentsSection news={fakenewsitem} />
            </div>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <div className={classes.section}>
              <Divider style={{ margin: "0px 0 10px 0" }} />
              <Typography variant="h5">
                <strong>You might also like</strong>
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Grid
              className={classes.container}
              container
              alignItems="stretch"
              spacing={3}
            >
              {recommendedPosts ? (
                recommendedPosts.map((news) => (
                  <Grid key={news._id} item xs={12} sm={12} md={6} lg={3}>
                    <FakeNews news={news} />
                  </Grid>
                ))
              ) : (
                <div></div>
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default FakeNewsDetails;
