// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCP-wBtg4PjCW-zms0wsNemtxuNgJI3Mns",
  authDomain: "musica-v1.firebaseapp.com",
  projectId: "musica-v1",
  storageBucket: "musica-v1.appspot.com",
  messagingSenderId: "440978475886",
  appId: "1:440978475886:web:31eb0af67267f696fdcf7f",
  measurementId: "G-PMK4VRPCR1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);