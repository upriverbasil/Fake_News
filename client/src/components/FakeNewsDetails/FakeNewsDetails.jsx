import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";

import { getFakeNewsItem } from "../../actions/fakeNews";
import useStyles from "./styles";

const FakeNewsDetails = () => {
  const  fakenewsitem  = useSelector((state) => {return(state?.fakeNews)})?.fakenewsitem;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    
    dispatch(getFakeNewsItem(id))
    console.log(fakenewsitem)
    console.log(moment(fakenewsitem?.publishDate).fromNow())
  },[id]);

  

  return (  !fakenewsitem?(<div></div>):
    (<Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
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
            {fakenewsitem.tags ? fakenewsitem.tags.map((tag) => `#${tag} `):"NO TAGS"}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {fakenewsitem?.summary}
          </Typography>
          <Typography variant="h6">Created by: {fakenewsitem.authorName}</Typography>
          <Typography variant="body1">
            {moment(fakenewsitem?.publishDate).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Comments - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              fakenewsitem?.topImage || fakenewsitem?.imageLinks[0] ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={fakenewsitem?.title}
          />
        </div>
      </div>
    </Paper>
  ));
};

export default FakeNewsDetails;
