import React, { useState } from 'react';
import { Link, Button, Avatar, Grid, Typography, Container, TextField, CssBaseline, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Joi from '@hapi/joi';
import StickyFooter from '../components/StickyFooter';
import { Alert } from '@material-ui/lab';

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

export default function Forgot() {

    const [email, setEmail] = useState('')

    const [emailBlurred, setEmailBlurred] = useState(false)

    const [emailError, setEmailError] = useState(true)

    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState('success');
    const [message, setMessage] = React.useState('');

    function _submit(event) {
        event.preventDefault();
        // axios.post('/auth/forgot', { email })
        //     .then(res => {
        //         setSeverity('success');
        //         setMessage('The reset link has been sent to the email address');
        //         setOpen(true);
        //         setEmail('');
        //         setEmailBlurred(false);
        //         setEmailError(true);
        //     })
        //     .catch(err => {
        //         const { email } = err.response.data;
        //         setSeverity('error');
        //         setMessage(email);
        //         setOpen(true);
        //     });
    }

    function handleEmailChange(event) {
        const schema = Joi.object({ email: Joi.string().email({ tlds: { allow: false } }).required() })
        setEmailError(schema.validate({ email }).error ? true : false)
        setEmail(event.target.value);
    }

    function handleEmailBlur() {
        const schema = Joi.object({ email: Joi.string().email({ tlds: { allow: false } }).required() })
        setEmailError(schema.validate({ email }).error ? true : false)
        setEmailBlurred(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const classes = useStyles();

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
                        Forgot Password
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            value={email}
                            onChange={handleEmailChange}
                            variant="standard"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            onBlur={handleEmailBlur}
                            autoComplete="email"
                            autoFocus
                            error={emailBlurred && emailError}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={_submit}
                        >
                            Get Link
          </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/login" variant="body2">
                                    Back to Login
              </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </StickyFooter>
    );
}