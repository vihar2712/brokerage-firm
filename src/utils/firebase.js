// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYqNCH2l321-qfaK8urO6zcwGF22TYY1Y",
  authDomain: "broking-firm-81b18.firebaseapp.com",
  projectId: "broking-firm-81b18",
  storageBucket: "broking-firm-81b18.appspot.com",
  messagingSenderId: "655810054992",
  appId: "1:655810054992:web:16d8d46c81b06e284d7a55",
  measurementId: "G-NW37CQPFEZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
