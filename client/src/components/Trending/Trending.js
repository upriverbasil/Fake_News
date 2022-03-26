import React, { useEffect } from "react";
import { AppBar, Typography, CircularProgress,Grid} from "@material-ui/core";
import useStyles from "./styles";
import {useSelector,useDispatch} from 'react-redux'
import FakeNews from "../fakeNews/FakeNews";

const Trending = () => {
  

  const classes = useStyles();
  const {trending} = useSelector((state)=>(state.fakeNews))
  useEffect(()=>{console.log(trending,"ooooo")},[trending])
  return ( 
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Typography variant="h5">Trending</Typography>
      
    
    {!trending?.length?(<CircularProgress alightItems="center" />):(
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {trending.map((news) => (
        <Grid key={news._id} item xs={12} sm={12} md={6} lg={3}>
          <Typography>{news.title}</Typography>
        </Grid>
      ))}
    </Grid>
  )};
  </AppBar>)
      
};

export default Trending;
