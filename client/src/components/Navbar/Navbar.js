import React,{useState,useEffect} from "react";
import { Typography,AppBar, Toolbar, Avatar,Button} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import useStyles from "./styles";
import fake_news from "../../images/fakenews.png";
import fake_news_text from "../../images/FakeNewsText.png";
import {Link} from 'react-router-dom';
import decode from 'jwt-decode';

const Navbar = (props) => {
    const classes = useStyles();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(()=>{
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
      
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
          }
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])

    const logout = () => {
        dispatch({type:'LOGOUT'})
        setUser(null)
        // navigate("/fake-news"
        props.setuser(null)
    }
   
    return(
        
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img src={fake_news_text} alt="fake_news_text" height="45px" />
                <img className={classes.image} src={fake_news} alt="fake News" height="40px" />
            </Link>
            <Toolbar className={classes.Toolbar}>
                {user ? (
                    <div className={classes.profile}> 
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                )
                 : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                 )
                }
            </Toolbar>
        </AppBar>
       
    )
}

export default Navbar;