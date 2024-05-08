import React, { useEffect, useState } from 'react';
import {Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {jwtDecode} from 'jwt-decode';

import useStyles from './styles';
import memoriesLogo from "../../images/memoriesLogo.png";
import memoriesText from "../../images/memoriesText.png";


const Navbar = () => {
    const classes = useStyles();
    const [ user, setuser ] = useState(JSON.parse(localStorage.getItem( 'profile' )));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT'});
        navigate('/');
        setuser(null);
    }

    useEffect(()=>{
        const token = user?.token;
        if(token){
            let decodedToken = jwtDecode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) logout()
        }
        setuser(JSON.parse(localStorage.getItem( 'profile' )));
    }, [location]);
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to='/' className={classes.brandContainer}>
            <img  src={memoriesText} alt='icon' height="45" />
            <img className={classes.image}  src={memoriesLogo} alt='icon' height="40" />
        </Link>
        <Toolbar className={classes.toolbar}>
            { user  ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageurl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                    <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
                </div>
                ) : (
                    <Button component={Link} to="/auth" variant='contained' color="primary">Sign In</Button>
                )
            }
        </Toolbar>
    </AppBar>
  )
}

export default Navbar;
