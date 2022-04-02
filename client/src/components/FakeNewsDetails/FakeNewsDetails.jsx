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
                  Published by: {fakenewsitem.authorName}
                </Typography>
              ) : (
                <></>
              )}
              <Typography variant="body1">
                {moment(
                  fakenewsitem.publishDate,
                  "DD-MM-YYYY HH:mm:ss"
                ).fromNow()}
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                color="textSecondary"
                component="h2"
              >
                {fakenewsitem?.tags.map ? (
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
                title={"Check out this fake news!" + fakenewsitem.title}
              >
                <TwitterIcon logoFillColor="white" round={true} />
              </TwitterShareButton>
              <WhatsappShareButton
                url={window.location.href}
                title={"Check out this fake news!" + fakenewsitem.title}
              >
                <WhatsappIcon logoFillColor="white" round={true} />
              </WhatsappShareButton>
            </div>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <div className={classes.section}>
              <Divider style={{ margin: "0px 0 10px 0" }} />
              <Typography variant="h5">
                <strong>Comments</strong>
              </Typography>
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
            <div className={classes.section}>
              {recommendedPosts ? (
                recommendedPosts.map(({ title, _id }) => (
                  <div
                    style={{ margin: "20px", cursor: "pointer" }}
                    onClick={() => {
                      openNews(_id);
                    }}
                    key={_id}
                  >
                    <Typography gutterBottom variant="h6">
                      {title}
                    </Typography>
                  </div>
                ))
              ) : (
                <div></div>
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default FakeNewsDetails;
