import React from "react";
import { Typography,AppBar, Toolbar, Avatar,Button} from "@material-ui/core";
import useStyles from "./styles";
import fake_news from "../../images/fakenews.png";
import {Link} from 'react-router-dom';

const Navbar = () => {
    const classes = useStyles();
    const user=null;
    return(
        
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <img className={classes.image} src={fake_news} alt="fake News" height="40" />
                <Typography component={Link} to="/ " className={classes.heading} variant="h3" align="center">FAKE NEWS</Typography>
            </div>
            <Toolbar className={classes.Toolbar}>
                {user ? (
                    <div className={classes.profile}> 
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" >Logout</Button>
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