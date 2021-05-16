import React, { useState, useEffect } from 'react';
import { Link, Button, Avatar, Grid, Typography, Container, TextField, CssBaseline, InputAdornment, IconButton, FormControl, InputLabel, Input, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Joi from '@hapi/joi';
import StickyFooter from '../components/StickyFooter';
import { Alert } from '@material-ui/lab';
import { auth } from '../firebase';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    // Blurred
    const [emailBlurred, setEmailBlurred] = useState(false)
    const [passwordBlurred, setPasswordBlurred] = useState(false)

    // Errors
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    // Alert show
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState('success');
    const [message, setMessage] = React.useState('');

    function _login(event) {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .then(res => {
                setEmail('');
                setPassword('');
                setShowPassword(false);
                setEmailBlurred(false);
                setPasswordBlurred(false);
                setEmailError(true);
                setPasswordError(true);
                props.history.replace('/vehicleCount');
            })
            .catch(err => {
                setSeverity('error');
                setMessage(err.message);
                setOpen(true);
            });
    }

    function handleEmailChange(event) {
        const schema = Joi.object({ email: Joi.string().email({ tlds: { allow: false } }).required() })
        setEmailError(schema.validate({ email }).error ? true : false)
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleClickShowPassword() {
        setShowPassword(!showPassword);
    };

    function handleEmailBlur() {
        const schema = Joi.object({ email: Joi.string().email({ tlds: { allow: false } }).required() })
        setEmailError(schema.validate({ email }).error ? true : false)
        setEmailBlurred(true);
    }

    function handlePasswordBlur(event) {
        setPasswordBlurred(true)
    }

    function checkPasswordError() {
        const schema = Joi.object({ password: Joi.string().min(6).required() })
        setPasswordError(schema.validate({ password }).error ? true : false)
    }

    useEffect(() => {
        checkPasswordError();
    })

    const classes = useStyles();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <StickyFooter>
            <Container component="main" maxWidth="xs">
                <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert elevation={6} variant="filled" onClose={handleClose} severity={severity}>
                        {message}
                    </Alert>
                </Snackbar>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            value={email}
                            onChange={handleEmailChange}
                            variant="standard"
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onBlur={handleEmailBlur}
                            error={emailBlurred && emailError}
                        />
                        <FormControl
                            style={{ width: '100%' }}
                            error={passwordBlurred && passwordError}
                        >
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={handlePasswordChange}
                                onBlur={handlePasswordBlur}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                        // onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={_login}
                            disabled={emailError || passwordError}
                        >
                            Login
          </Button>
                        <Grid container>
                            <Grid item xs>
                                {/* <Link href="/forgot" variant="body2">
                                    Forgot password?
              </Link> */}
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </StickyFooter>
    );
}