import React, { useState, useEffect } from "react";
import { Link, Button, Avatar, Grid, Typography, Container, CssBaseline, FormControl, InputLabel, Input, InputAdornment, IconButton, Snackbar } from '@material-ui/core';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles } from "@material-ui/core/styles";
import StickyFooter from "../components/StickyFooter";
import { Alert } from '@material-ui/lab'
import Joi from '@hapi/joi';
import {useParams} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(4),
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(2)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

export default function Reset(props) {
	const { token } = useParams();
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [showPassword, setShowPassword] = useState(false)
	const [showPassword2, setShowPassword2] = useState(false)

	// Blurred
	const [passwordBlurred, setPasswordBlurred] = useState(false)
	const [password2Blurred, setPassword2Blurred] = useState(false)

	// Errors
	const [passwordError, setPasswordError] = useState(true)
	const [password2Error, setPassword2Error] = useState(true)

	// Alert show
	const [open, setOpen] = React.useState(false);
	const [severity, setSeverity] = React.useState('success');
	const [message, setMessage] = React.useState('');

	function _signUp(event) {
		event.preventDefault();
		// axios.post(`/auth/reset?token=${token}`, { password, password2 })
		// 	.then(res => {
		// 		setSeverity('success');
		// 		setMessage('Account created. Check your email for verification link');
		// 		setOpen(true);
		// 		setPassword('');
		// 		setPassword2('');
		// 		setShowPassword(false);
		// 		setShowPassword2(false);
		// 		setPasswordBlurred(false);
		// 		setPassword2Blurred(false);
		// 		setPasswordError(true);
		// 		setPassword2Error(true);
		// 	})
		// 	.catch(err => {
		// 		const { password, password2 } = err.response.data;
		// 		setSeverity('error');
		// 		setMessage(password || password2);
		// 		setOpen(true);
		// 	});
	}

	function handlePasswordChange(event) {
		setPassword(event.target.value);
	}

	function handlePassword2Change(event) {
		setPassword2(event.target.value);
	}

	function handleClickShowPassword() {
		setShowPassword(!showPassword);
	};

	function handleClickShowPassword2() {
		setShowPassword2(!showPassword2);
	};

	function handlePasswordBlur(event) {
		setPasswordBlurred(true);
	}

	function handlePassword2Blur(event) {
		setPassword2Blurred(true);
	}

	function checkPasswordError() {
		const schema = Joi.object({ password: Joi.string().min(6).required() })
		setPasswordError(schema.validate({ password }).error ? true : false)
	}

	function checkPassword2Error() {
		const schema = Joi.object({ password2: Joi.string().min(6).required() })
		setPassword2Error(schema.validate({ password2 }).error || password2 !== password ? true : false)
	}

	useEffect(() => {
		checkPasswordError();
		checkPassword2Error();
	});

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
						Reset Password
					</Typography>
					<form className={classes.form} noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12}>

								<FormControl
									style={{ width: '100%' }}
									error={passwordBlurred && passwordError}
								>
									<InputLabel htmlFor="standard-adornment-password">Password (at least 6 characters)</InputLabel>
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
												>
													{showPassword ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={12}>

								<FormControl style={{ width: '100%' }}
									error={password2Blurred && password2Error}
								>
									<InputLabel htmlFor="standard-adornment-password2">Confirm Password</InputLabel>
									<Input
										id="standard-adornment-password2"
										type={showPassword2 ? 'text' : 'password'}
										value={password2}
										onChange={handlePassword2Change}
										onBlur={handlePassword2Blur}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password2 visibility"
													onClick={handleClickShowPassword2}
												>
													{showPassword2 ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										}
									/>
								</FormControl>
							</Grid>

						</Grid>
						<Button
							type="submit"
							fullWidth
							onClick={_signUp}
							variant="contained"
							color="primary"
							disabled={ passwordError || password2Error}
							className={classes.submit}
						>
							Reset Password
						</Button>
						<Grid container justify="flex-end">
							<Grid item>
								<Link href="/login" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		</StickyFooter>
	);
}
