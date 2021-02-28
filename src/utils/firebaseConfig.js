import firebase from "firebase/app";
import "firebase/auth";

const env = (path) => process.env[`REACT_APP_FIREBASE_${path}`];

const projectId = env("PROJECT_ID");

const app = firebase.initializeApp({
  apiKey: env("API_KEY"),
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://${projectId}-default-rtdb.firebaseio.com`,
  projectId,
  storageBucket: `${projectId}.appspot.com`,
  messagingSenderId: env("SENDER_ID"),
  appId: env("APP_ID"),
});

export default app;
