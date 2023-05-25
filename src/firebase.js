import firebase from 'firebase';

// const firebaseConfig = {
//   apiKey: "AIzaSyCoD7kBIMl7bNLMwnRMwQ2_OebreLYzOe4",
//   authDomain: "investors-hub-409a6.firebaseapp.com",
//   projectId: "investors-hub-409a6",
//   storageBucket: "investors-hub-409a6.appspot.com",
//   messagingSenderId: "414360466294",
//   appId: "1:414360466294:web:2444bcc2fbb8c6d3310057"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBBewDuOb6MrEFFYIBZjrdkS5SVmR0tR-4",
  authDomain: "test-a68de.firebaseapp.com",
  projectId: "test-a68de",
  storageBucket: "test-a68de.appspot.com",
  messagingSenderId: "343162560366",
  appId: "1:343162560366:web:1d5be5bf7c8724aee66b7f",
  measurementId: "G-1R0Q95ZBDT"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebaseApp.storage();

export { auth, provider, storage };
export default db;