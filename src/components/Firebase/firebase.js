import app from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBSUuV4MTQ9tdPU9BvUGwl4UijYch11Ie4",
  authDomain: "react-firebase-demo-e350f.firebaseapp.com",
  projectId: "react-firebase-demo-e350f",
  storageBucket: "react-firebase-demo-e350f.appspot.com",
  messagingSenderId: "1021804410846",
  appId: "1:1021804410846:web:36c3c3695f2b7694ea4f4f",
  measurementId: "G-QDBJ8MJYZH",
};

// Initialize Firebase
class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);
}

export default Firebase;
