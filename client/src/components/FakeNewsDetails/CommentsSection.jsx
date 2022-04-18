import React, { useState } from "react";
import { Typography, TextField, Button } from "@material-ui/core/";
import { useDispatch } from "react-redux";

import { commentNews } from "../../actions/fakeNews";
import useStyles from "./styles";

const CommentsSection = ({ news }) => {
  const classes = useStyles();
  const [comments, setComments] = useState(news?.comments);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;

    const newComments = await dispatch(commentNews(finalComment, news._id));

    setComments(newComments);
    setComment("");
  };

  return (
    <div>
      <Typography gutterBottom variant="h5">
        <strong>Comments</strong>
      </Typography>
      <div className={classes.commentsInnerContainer}>
        {comments.reverse().map((comment, index) => (
          <Typography key={index} gutterBottom variant="subtitle1">
            <strong>{comment.split(": ")[0]}:</strong>
            {comment.split(":")[1]}
          </Typography>
        ))}
      </div>
      {user?.result?.name && (
        <div style={{ width: "70%" }}>
          <TextField
            fullWidth
            rows={4}
            variant="outlined"
            label="Write a comment"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            style={{ marginTop: "10px" }}
            color="primary"
            disabled={!comment}
            variant="contained"
            onClick={handleClick}
          >
            Comment
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
