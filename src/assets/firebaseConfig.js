import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyA4p1aTMLEcgmqRnB82HHjtBr2u7N7xpoI",
  authDomain: "movies-f59fb.firebaseapp.com",
  databaseURL: "https://movies-f59fb.firebaseio.com",
  projectId: "movies-f59fb",
  storageBucket: "",
  messagingSenderId: "772025325672"
};
firebase.initializeApp(config);

export const db = firebase.firestore();
export const auth = firebase.auth();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user.uid, "is logged");
  } else {
    // No user is signed in.
  }
});
