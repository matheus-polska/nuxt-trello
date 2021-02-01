import firebase from "firebase";
// uncomment the below if you use firestore DB instead of firebase DB
require("firebase/firestore");

const config = {
  apiKey: "AIzaSyAwXrlmLmVPK7CMmnGjwQ4xm2wFNTaFg8Y",
  authDomain: "trello-2f3ad.firebaseapp.com",
  projectId: "trello-2f3ad",
  storageBucket: "trello-2f3ad.appspot.com",
  messagingSenderId: "939501346758",
  appId: "1:939501346758:web:45a166f1a9030b62a91cc7",
  measurementId: "1:939501346758:web:45a166f1a9030b62a91cc7"
};
const googleProvider = new firebase.auth.GoogleAuthProvider();

export default !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();
export { googleProvider };
