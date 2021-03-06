import React, { useState, useEffect } from "react";
import {
  Typography,
  AppBar,
  Toolbar,
  Avatar,
  Button,
  TextField,
  Menu,
  MenuList,
  MenuItem,
  Fade,
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

  const [anchorEl, setAnchorEl] = useState(null);
  const [language, setLanguage] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const setfilter = (event) => {
    if (event.target.outerText == "None") {
      setLanguage(null);
    } else setLanguage(event.target.outerText.toLowerCase());
    setAnchorEl(null);
  };

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
      navigate(
        `/fake-news/search?searchQuery=${
          search || "none"
        }&page=1&lang=${language}`
      );
    } else {
      navigate("/");
    }
  };

  const categorySearch = (e) => {
    const search = e.currentTarget.value;

    if (search.trim()) {
      navigate(
        `/fake-news/search?searchQuery=${
          search || "none"
        }&page=1&lang=${language}`
      );
    } else {
      navigate("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
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
          {user?.adminStatus ? (
            <Button
              component={Link}
              to="/new-admin"
              variant="contained"
              color="primary"
            >
              Make New Admin
            </Button>
          ) : null}
        </Toolbar>
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
        <Button onClick={categorySearch} value="Politics">
          <b>Politics</b>
        </Button>
        <Button onClick={categorySearch} value="Sports">
          <b>Sports</b>
        </Button>
        <Button onClick={categorySearch} value="Business">
          <b>Business</b>
        </Button>
        <Button onClick={categorySearch} value="Health">
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
          id="fade-button"
          aria-controls={Boolean(anchorEl) ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={Boolean(anchorEl) ? "true" : undefined}
          onClick={handleClick}
        >
          {language ? language : "All Languages"}
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          TransitionComponent={Fade}
          variant="contained"
        >
          <MenuItem onClick={setfilter}>None</MenuItem>
          <MenuItem onClick={setfilter}>Assamese</MenuItem>
          <MenuItem onClick={setfilter}>Bangla</MenuItem>
          <MenuItem onClick={setfilter}>Bangladesh</MenuItem>
          <MenuItem onClick={setfilter}>English</MenuItem>
          <MenuItem onClick={setfilter}>Gujarati</MenuItem>
          <MenuItem onClick={setfilter}>Hindi</MenuItem>
          <MenuItem onClick={setfilter}>Malayalam</MenuItem>
          <MenuItem onClick={setfilter}>Marathi</MenuItem>
          <MenuItem onClick={setfilter}>Myanmar</MenuItem>
          <MenuItem onClick={setfilter}>Odia</MenuItem>
          <MenuItem onClick={setfilter}>Punjabi</MenuItem>
          <MenuItem onClick={setfilter}>SriLanka</MenuItem>
          <MenuItem onClick={setfilter}>Tamil</MenuItem>
          <MenuItem onClick={setfilter}>Telugu</MenuItem>
          <MenuItem onClick={setfilter}>Urdu</MenuItem>
        </Menu>
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
