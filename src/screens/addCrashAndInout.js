import React, { useState } from 'react';
import { FieldValue, firestore, serverTimeStamp } from '../firebase';

const Comp = () => {
    const increaseIn = () => {
        firestore.collection('inout').doc('doc')
            .update({
                inVehicle: FieldValue.increment(1),
            })
    }

    const increaseOut = () => {
        firestore.collection('inout').doc('doc')
            .update({
                outVehicle: FieldValue.increment(1),
            })
    }

    const submitForm = () => {
        let max = 9999, min = 8999;
        let confidence = Math.random() * (max - min) + min;
        
        firestore.collection('crashes').add({
            place: 'Delhi',
            date: serverTimeStamp,
            cam_no: 1,
            confidence,
        })
    }

    return (
        <div style={{ marginTop: '5em' }}>
            <div>
                <button name="incIn" onClick={increaseIn}>Increase In</button>
                <button name="incOut" onClick={increaseOut}>Increase Out</button>
            </div>

            <br />
            <br />
            <br />

            <div>
                <button onClick={submitForm}>Add Crash</button>
            </div>

        </div>
    )
}

export default Comp;