import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// DEV
const config = {
    apiKey: "AIzaSyDdWdfWqA1WDI2zCVqLUgZbB9ieFTRnQTA",
    authDomain: "precrash-8d994.firebaseapp.com",
    projectId: "precrash-8d994",
    storageBucket: "precrash-8d994.appspot.com",
    messagingSenderId: "318244779376",
    appId: "1:318244779376:web:7c0d1294837ac86fe84bb5",
    measurementId: "G-Y5Z6KSFPCT"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const serverTimeStamp = firebase.firestore.FieldValue.serverTimestamp();
export const FieldValue = firebase.firestore.FieldValue;
export const timestampFromDate = firebase.firestore.Timestamp.fromDate;
export const storage = firebase.storage();

export default firebase;
