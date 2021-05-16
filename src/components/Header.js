import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, CssBaseline, useTheme, Typography, IconButton, AppBar, Toolbar, Tooltip, MenuItem, Menu } from '@material-ui/core';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { withRouter } from 'react-router-dom';

import PersonIcon from '@material-ui/icons/Person';
import { auth } from '../firebase';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: theme.palette.type === 'dark' ? '#333' : '#1976d2'
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    },
    title: {
        flexGrow: 1,
        color: 'white',
        cursor: 'pointer'
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        // position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
    },
    flexButton: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },
    headerButton: {
        color: 'white'
    }
}));

function Header(props) {
    const classes = useStyles();

    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setIsAuth(true);
            } else {
                setIsAuth(false);
            }
        });
    }, [])

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    useEffect(() => props.history.listen(() => {
        console.log(props.history);
        props.setAuth(window.localStorage.getItem('Authorization') ? true : false);
    }));

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleThemeChange = () => {
        props.toggleTheme();
    };

    const handleLogout = () => {
        props.history.push('/logout');
        handleClose();
    }

    const handleLogin = () => {
        props.history.push('/login');
        handleClose();
    }

    const handleSignUp = () => {
        props.history.push('/signup');
        handleClose();
    }

    const handleInOut = () => {
        props.history.push('/vehicleCount');
        handleClose();
    }

    const handleParking = () => {
        props.history.push('/parking');
        handleClose();
    }

    const handleCrashHist = () => {
        props.history.push('/crashHistory');
        handleClose();
    }

    const handleInoutHist = () => {
        props.history.push('/inoutHistory');
        handleClose();
    }

    const loginMenuItems = [
        <MenuItem key="InOut" onClick={handleInOut}>Vehicle In-Out Count</MenuItem>,
        <MenuItem key="Parking" onClick={handleParking}>Parking Count</MenuItem>,
        <Divider key="ItemsDivider" />,
        <MenuItem key="CrashHistory" onClick={handleCrashHist}>Crash History</MenuItem>,
        <MenuItem key="InOutHistory" onClick={handleInoutHist}>In-Out History</MenuItem>,
        <Divider key="loginMenuItemsDivider" />,
        <MenuItem key="Logout" onClick={handleLogout}>Logout</MenuItem>
    ]

    const logoutMenuItems = [
        <MenuItem key="Sign Up" onClick={handleSignUp}>Sign Up</MenuItem>,
        <MenuItem key="Logout" onClick={handleLogin}>Login</MenuItem>
    ]

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed">
                {/* { isDialogOpen && <BlogDialog open={isDialogOpen} handleClose={handleDialogClose} />} */}
                <Toolbar variant="dense">
                    {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
                    <Typography onClick={() => { props.history.push('/') }} variant="h6" className={classes.title}>
                        In-Out
                    </Typography>
                    <div>
                        <Tooltip title="Toogle dark mode" arrow>
                            <IconButton
                                className={classes.headerButton}
                                aria-label="toggle theme"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleThemeChange}
                            >
                                {props.theme.palette.type === 'dark' ? <Brightness4Icon /> : <BrightnessHighIcon />}
                            </IconButton>
                        </Tooltip>
                        <IconButton
                            className={classes.headerButton}
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleClick}>
                            <PersonIcon />
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {isAuth ? loginMenuItems : logoutMenuItems}
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withRouter(Header);