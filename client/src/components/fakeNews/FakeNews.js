import React from "react";
import { Grid, CircularProgress} from "@material-ui/core";
import { useSelector } from "react-redux";

import FakeNews from "./fakeNewsItem/FakeNewsItem";
import useStyles from './styles'


const Fakenews = () => {

    const fakenews = useSelector((state)=>state.fakeNews);
    const classes = useStyles();

    // console.log(fakenews)

    return(
        !fakenews.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {fakenews.map((news) =>(
                    <Grid key={news._id} item xs={12} sm={6}>
                        <FakeNews news={news} />
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Fakenews;