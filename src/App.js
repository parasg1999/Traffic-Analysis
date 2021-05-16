import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import { lightTheme, darkTheme } from './themes';

import Header from './components/Header';
import { Login, SignUp, Forgot, Reset, VehicleCount, Logout, Parking, CrashHistory, InoutHistory } from './screens'
import Comp from './screens/addCrashAndInout';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { firestore, serverTimeStamp, timestampFromDate } from './firebase';

export default function App() {
    const { enqueueSnackbar } = useSnackbar();

    const [theme, setTheme] = useState(window.localStorage.getItem('theme') === 'dark' ? darkTheme : lightTheme)

    const [auth, setAuth] = useState(window.localStorage.getItem('Authorization') ? true : false)

    useEffect(() => {
        setAuth(window.localStorage.getItem('Authorization') ? true : false);
    })

    useEffect(() => {
        const unsubscribe = firestore.collection('crashes').
            where('date', '>=', timestampFromDate(new Date()))
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        const { place, confidence, date } = change.doc.data();
                        enqueueSnackbar(`Crash at ${place} recorded on ${new Date(date?.seconds * 1000).toString().substring(4, 21)} with ${confidence} confidence`, { variant: 'error' })
                    }
                });
            });

        return () => {
            unsubscribe();
        };
    }, [])

    function toggleTheme() {
        const newTheme = theme.palette.type === 'dark' ? lightTheme : darkTheme;
        setTheme(newTheme);
        window.localStorage.setItem('theme', newTheme.palette.type);
    }

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Header auth={auth} setAuth={setAuth} theme={theme} toggleTheme={toggleTheme} />
                <Switch>
                    <Route path="/signup" component={SignUp} />
                    <Route exact path="/" component={Login} />
                    <Route path="/forgot" component={Forgot} />
                    <Route path="/change" component={Comp} />
                    <Route exact path="/vehicleCount" component={VehicleCount} />
                    <Route exact path="/parking" component={Parking} />
                    <Route exact path="/crashHistory" component={CrashHistory} />
                    <Route exact path="/inoutHistory" component={InoutHistory} />
                    <Route path="/reset/:token" component={Reset} />
                    <Route path="/logout" component={Logout} />
                    {/* <Route exact path="/" component={Home} /> */}
                    {/* <Route path="/*" render={() => <Redirect to="/" />} /> */}
                </Switch>
            </Router>
        </ThemeProvider>
    );
}
