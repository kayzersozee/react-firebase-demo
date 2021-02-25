import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyBSUuV4MTQ9tdPU9BvUGwl4UijYch11Ie4",
  authDomain: "react-firebase-demo-e350f.firebaseapp.com",
  databaseURL:
    "https://react-firebase-demo-e350f-default-rtdb.europe-west1.firebasedatabase.app",
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
    this.db = app.database();
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  // *** Merge Auth and DB User API *** //
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then((snapshot) => {
            const dbUser = snapshot.val();
            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }
            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser,
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***
  user = (uid) => this.db.ref(`users/${uid}`);
  users = () => this.db.ref("users");
}

export default Firebase;
