const firebase = require('firebase');

const config = {
    apiKey: "AIzaSyCsgt7ZuxsJ82_XU8TkOui0JAEJpaZuPzs",
    authDomain: "feedforward-968b7.firebaseapp.com",
    databaseURL: "https://feedforward-968b7.firebaseio.com",
    storageBucket: "feedforward-968b7.appspot.com",
    messagingSenderId: "191860792729"
  };

firebase.initializeApp(config);

module.exports = firebase;
