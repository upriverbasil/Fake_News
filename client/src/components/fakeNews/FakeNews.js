import React from "react";
import { Grid, CircularProgress} from "@material-ui/core";
import { useSelector } from "react-redux";

import FakeNews from "./fakeNewsItem/FakeNewsItem";
import useStyles from './styles'


const Fakenews = () => {

    const {fakenews} = useSelector((state)=>state.fakeNews);
    const classes = useStyles();

    return(
        !fakenews?.length ? <CircularProgress alightItems="center"/> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {fakenews.map((news) =>(
                    <Grid key={news._id} item xs={12} sm={12} md={6} lg={3}>
                        <FakeNews news={news} />
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Fakenews;