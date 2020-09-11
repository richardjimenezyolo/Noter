import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAuPhMCbfwKSlmFJ39zn1nlxGmloQeSyEc",
    authDomain: "noter-792d8.firebaseapp.com",
    databaseURL: "https://noter-792d8.firebaseio.com",
    projectId: "noter-792d8",
    storageBucket: "noter-792d8.appspot.com",
    messagingSenderId: "465978902462",
    appId: "1:465978902462:web:4df9d8e2e469e6ec685bef",
    measurementId: "G-J3C0G595VX"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

window.firebase = firebase
firebase.firestore().enablePersistence();

export let db = firebase.firestore();
export let auth = firebase.auth();