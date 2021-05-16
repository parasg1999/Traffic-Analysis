import { Paper, Snackbar, Tab, Tabs } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';

export default function VehicleCount(props) {
    const { enqueueSnackbar } = useSnackbar();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [inout, setInOut] = useState({
        inVehicle: 0,
        outVehicle: 0,
    })

    useEffect(() => {
        const unsub2 = firestore.collection('inout').doc('doc')
            .onSnapshot(doc => {
                const { inVehicle, outVehicle } = doc.data();
                setInOut({
                    inVehicle,
                    outVehicle,
                })
            })

        return () => {
            unsub2();
        };
    }, [])

    return (
        <>
            <div style={{ marginTop: '4em' }}>
                <Paper square>
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab label="Cam-1" />
                        <Tab label="Cam-2" disabled />
                        <Tab label="Cam-3" />
                    </Tabs>
                </Paper>
            </div>
            {value === 0 ? (<div style={{ display: 'flex', marginLeft: '10vw' }}>
                <video style={{ marginTop: '15vh', width: '600px' }} src="/vid.mp4" autoPlay muted></video>
                <div style={{ marginTop: '30vh', marginLeft: '10vw' }}>
                    <h1>In: {inout.inVehicle}</h1>
                    <h1>Out: {inout.outVehicle}</h1>
                </div>
            </div>) : (
                <div style={{ display: 'flex', marginLeft: '10vw' }}>
                    <div style={{ marginTop: '30vh' }}>
                        <h1>Camera not available</h1>
                    </div>
                </div>
            )}
        </>)
}