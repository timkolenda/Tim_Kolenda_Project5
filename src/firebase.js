import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCC7M8l79Qqn0n2gYnjcQeqLD1Qnqy4C-Q",
    authDomain: "rplsl-b2e0d.firebaseapp.com",
    databaseURL: "https://rplsl-b2e0d.firebaseio.com",
    projectId: "rplsl-b2e0d",
    storageBucket: "rplsl-b2e0d.appspot.com",
    messagingSenderId: "957103642208"
};
firebase.initializeApp(config);


export default firebase