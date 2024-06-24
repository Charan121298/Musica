import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCP-wBtg4PjCW-zms0wsNemtxuNgJI3Mns",
  authDomain: "musica-v1.firebaseapp.com",
  projectId: "musica-v1",
  storageBucket: "musica-v1.appspot.com",
  messagingSenderId: "440978475886",
  appId: "1:440978475886:web:31eb0af67267f696fdcf7f",
  measurementId: "G-PMK4VRPCR1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);