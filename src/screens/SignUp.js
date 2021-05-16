import React, { useState, useEffect } from "react";
import { Link, Button, Avatar, Grid, Typography, Container, TextField, CssBaseline, FormControl, InputLabel, Input, InputAdornment, IconButton, Snackbar } from '@material-ui/core';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles } from "@material-ui/core/styles";
import StickyFooter from "../components/StickyFooter";
import { Alert } from '@material-ui/lab'
import Joi from '@hapi/joi';
import { auth } from "../firebase";

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

export default function SignUp() {
	const [fname, setFName] = useState('');
	const [lname, setLName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [showPassword, setShowPassword] = useState(false)
	const [showPassword2, setShowPassword2] = useState(false)

	// Blurred
	const [fnameBlurred, setFNameBlurred] = useState(false)
	const [lnameBlurred, setLNameBlurred] = useState(false)
	const [emailBlurred, setEmailBlurred] = useState(false)
	const [passwordBlurred, setPasswordBlurred] = useState(false)
	const [password2Blurred, setPassword2Blurred] = useState(false)

	// Errors
	const [lnameError, setLNameError] = useState(false)
	const [fnameError, setFNameError] = useState(false)
	const [emailError, setEmailError] = useState(false)
	const [passwordError, setPasswordError] = useState(false)
	const [password2Error, setPassword2Error] = useState(false)

	// Alert show
	const [open, setOpen] = React.useState(false);
	const [severity, setSeverity] = React.useState('');
	const [message, setMessage] = React.useState('');

	function _signUp(event) {
		event.preventDefault();

		auth.createUserWithEmailAndPassword(email, password)
			.then(res => {
				res.user.updateProfile({ displayName: `${fname} ${lname}` });
				setSeverity('success');
				setMessage('Account created.');
				setOpen(true);
				setFName('');
				setLName('');
				setEmail('');
				setPassword('');
				setPassword2('');
				setShowPassword(false);
				setShowPassword2(false);
				setFNameBlurred(false);
				setLNameBlurred(false);
				setEmailBlurred(false);
				setPasswordBlurred(false);
				setPassword2Blurred(false);
				setLNameError(true);
				setFNameError(true);
				setEmailError(true);
				setPasswordError(true);
				setPassword2Error(true);
			})
			.catch(err => {
				setSeverity('error');
				setMessage(err.message);
				setOpen(true);
			});
	}

	function handleFNameChange(event) {
		setFName(event.target.value);
		setFNameError(event.target.value === '')
	}

	function handleLNameChange(event) {
		setLName(event.target.value);
		setLNameError(event.target.value === '')
	}

	function handleEmailChange(event) {
		const schema = Joi.object({ email: Joi.string().email({ tlds: { allow: false } }).required() })
		setEmailError(schema.validate({ email }).error ? true : false)
		setEmail(event.target.value);
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

	function handleFNameBlur(event) {
		setFNameError(event.target.value === '')
		setFNameBlurred(true);
	}

	function handleLNameBlur(event) {
		setLNameError(event.target.value === '')
		setLNameBlurred(true);
	}

	function handleEmailBlur() {
		const schema = Joi.object({ email: Joi.string().email({ tlds: { allow: false } }).required() })
		setEmailError(schema.validate({ email }).error ? true : false)
		setEmailBlurred(true);
	}

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
						Sign up
					</Typography>
					<form className={classes.form} noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									value={fname}
									onChange={handleFNameChange}
									autoComplete="fname"
									name="firstName"
									variant="standard"
									required
									fullWidth
									id="firstName"
									label="First Name"
									onBlur={handleFNameBlur}
									error={fnameBlurred && fnameError}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									value={lname}
									onChange={handleLNameChange}
									variant="standard"
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="lname"
									onBlur={handleLNameBlur}
									error={lnameBlurred && lnameError}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									value={email}
									onChange={handleEmailChange}
									variant="standard"
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									onBlur={handleEmailBlur}
									error={emailBlurred && emailError}
								/>
							</Grid>
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
							disabled={fnameError || lnameError || emailError || passwordError || password2Error}
							className={classes.submit}
						>
							Sign Up
						</Button>
						<Grid container justify="flex-end">
							<Grid item>
								<Link href="/" variant="body2">
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
