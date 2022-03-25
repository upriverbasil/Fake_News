import React, { useEffect } from "react";
import { AppBar, Typography } from "@material-ui/core";
import useStyles from "./styles";

const Trending = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Typography variant="h5">Trending</Typography>
    </AppBar>
  );
};

export default Trending;
