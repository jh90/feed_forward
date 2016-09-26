const firebase = require('firebase');

const config = {
    apiKey: "AIzaSyDtF7INc40vaKdZQvwwH65xssFh7E_KhC0",
    authDomain: "feedforwardt2.firebaseapp.com",
    databaseURL: "https://feedforwardt2.firebaseio.com",
    storageBucket: "feedforwardt2.appspot.com",
    messagingSenderId: "824770228681"
  };

firebase.initializeApp(config);

module.exports = firebase;
