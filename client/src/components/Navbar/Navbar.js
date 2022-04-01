import React, { useState, useEffect } from "react";
import {
  Typography,
  AppBar,
  Toolbar,
  Avatar,
  Button,
  TextField,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import useStyles from "./styles";
import fake_news from "../../images/fakenews.png";
import fake_news_text from "../../images/FakeNewsText.png";
import { Link } from "react-router-dom";
import decode from "jwt-decode";
import { getFakeNewsBySearch } from "../../actions/fakeNews";

const Navbar = (props) => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
    props.setuser(null);
  };

  const searchPost = (e) => {
    if (search.trim()) {
      dispatch(getFakeNewsBySearch({ search }));
      navigate(`/fake-news/search?searchQuery=${search || "none"}`);
    } else {
      navigate("/");
    }
  };

  const handleKeyPress = (e) => {
    console.log(e.key)
    if (e.key === 'Enter') {
      searchPost();
    }
  };

  return (
    <>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to="/" className={classes.brandContainer}>
          <img src={fake_news_text} alt="fake_news_text" height="45px" />
          <img
            className={classes.image}
            src={fake_news}
            alt="fake News"
            height="40px"
          />
        </Link>
        <Toolbar className={classes.Toolbar}>
          {user ? (
            <div className={classes.profile}>
              <Avatar
                className={classes.purple}
                alt={user.result.name}
                src={user.result.imageUrl}
              >
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography className={classes.userName} variant="h6">
                {user?.result.name}
              </Typography>
              <Button
                variant="contained"
                className={classes.logout}
                color="secondary"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <AppBar className={classes.appBar2} position="static" color="inherit">
        <Button onClick={searchPost} value="Politics">
          <b>Politics</b>
        </Button>
        <Button onClick={searchPost} value="Sports">
          <b>Sports</b>
        </Button>
        <Button onClick={searchPost} value="Business">
          <b>Business</b>
        </Button>
        <Button onClick={searchPost} value="Health">
          <b>Health</b>
        </Button>

        <TextField
          name="search"
          variant="outlined"
          label="Search Fake News"
          onKeyPress={handleKeyPress}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={classes.searchField}
        />
        <Button
          onClick={searchPost}
          className={classes.searchButton}
          variant="contained"
          color="primary"
        >
          Search
        </Button>
      </AppBar>
    </>
  );
};

export default Navbar;
