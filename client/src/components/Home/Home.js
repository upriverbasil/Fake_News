import React,{useEffect} from "react";
import { Grid, Grow, Container} from "@material-ui/core";
import { useDispatch } from "react-redux";

import FakeNews from "../fakeNews/FakeNews";
import Trending from "../Trending/Trending";
import { getFakeNews } from "../../actions/fakeNews";
import useStyles from "./styles";
const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFakeNews());
    }, [dispatch]);

    return(
        <Grow in>
            <Container>
            <Grid
                container
                justifyContent="space-between"
                alignItems="stretch"
                spacing={3}
            >
                <Grid item xs={12} sm={7}>
                <FakeNews />
                </Grid>
                <Grid item xs={12} sm={4}>
                <Trending />
                </Grid>
            </Grid>
            </Container>
        </Grow>
    )
}

export default Home;