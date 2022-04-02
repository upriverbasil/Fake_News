import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Grid,Button
} from "@material-ui/core/";
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";

import { getFakeNewsItem, getRecommended} from "../../actions/fakeNews";
import useStyles from "./styles";
import { deleteNews } from "../../actions/fakeNews";
const FakeNewsDetails = () => {
  const fakenewsitem = useSelector((state) => {
    return state?.fakeNews;
  })?.fakenewsitem;
  const recommended = useSelector((state) => {
    {return state?.fakeNews};
  })?.recommendednews;
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
  const recommendedPosts = recommended?recommended.filter(({ _id }) => _id !== fakenewsitem._id):null;
  useEffect(() => {
    dispatch(getFakeNewsItem(id));
  }, [id]);
  useEffect(() => {
    if (fakenewsitem) {
      console.log("pppp",fakenewsitem?.tags)
      dispatch(getRecommended({ search: 'none', tags: fakenewsitem?.tags?.join(',') }));
    }
  }, [fakenewsitem]);
  // useEffect(()=>{console.log(fakenewsitem?.tags.join(' '));console.log(recommendedPosts,"pppppppp")},[recommendedPosts])

  const openNews = (_id) => {
    navigate(`/fake-news/${_id}`);
  }
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
              <Typography
                gutterBottom
                variant="h6"
                color="textSecondary"
                component="h2"
              >
                {fakenewsitem.tags
                  ? fakenewsitem.tags.map(
                      (tag) => `#${tag.split(" ").join("_")} `
                    )
                  : <></>}
              </Typography>
              <Typography variant="body1">
                {moment(
                  fakenewsitem.publishDate,
                  "DD-MM-YYYY HH:mm:ss"
                ).fromNow()}
                <Typography gutterBottom variant="body1" component="p">
                  {fakenewsitem?.summary
                    ? fakenewsitem?.summary
                    : fakenewsitem?.content}
                </Typography>
              </Typography>

              <Typography variant="h6">
                Read more on  <a href={fakenewsitem?.articleLink} target="_blank">{fakenewsitem?.websiteName.split("_").join(" ")}</a>.
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
            <Divider style={{ margin: "10px 0 20px 0" }} />
            <Typography variant="body1">
              <strong>Comments - coming soon!</strong>
            </Typography>
          </Grid>
          <Grid item>
          
            {recommendedPosts?recommendedPosts.map(({ title,_id}) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => {openNews(_id)}} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
              </div>
            )):<div></div>}
          </Grid>
          <Button size="small" color="primary" onClick={()=>{dispatch(deleteNews(fakenewsitem._id)); navigate('/')}}><DeleteIcon fontSize="small" /> Delete</Button>
        </Grid>
        
      </div>
    </Paper>
  );
};

export default FakeNewsDetails;
