import firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyBuPnwHS9SPxLMQtTIxWwgMbi2o-1JC6bo",
  authDomain: "reactnative-proj.firebaseapp.com",
  databaseURL: "https://reactnative-proj-default-rtdb.firebaseio.com",
  projectId: "reactnative-proj",
  storageBucket: "reactnative-proj.appspot.com",
  messagingSenderId: "464774486374",
  appId: "1:464774486374:web:01f87abe2824bed100d0a7",
  measurementId: "G-8YW3VT4TZE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

export { db };
