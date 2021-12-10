import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPEZ9LJ7QEDSU3m4eJGKa7wuAeKlrLk30",
  authDomain: "mymoney-ea40e.firebaseapp.com",
  projectId: "mymoney-ea40e",
  storageBucket: "mymoney-ea40e.appspot.com",
  messagingSenderId: "360798541891",
  appId: "1:360798541891:web:4d058a4326abeb6e0ddcf6"
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
