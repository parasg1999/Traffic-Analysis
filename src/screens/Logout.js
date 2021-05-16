import React, { useEffect } from 'react';
import { auth } from '../firebase';

const Logout = ({ history }) => {
    useEffect(() => {
        auth.signOut()
            .then(() => {
                history.replace('/');
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <br />
    )
};

export default Logout;