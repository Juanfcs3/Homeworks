import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAHqQjxS9ckkxA3EBoHctloCOPekC9mFO4",
  authDomain: "challenge111213.firebaseapp.com",
  projectId: "challenge111213",
  storageBucket: "challenge111213.appspot.com", 
  messagingSenderId: "742310870577",
  appId: "1:742310870577:web:d941297844617866d01f10"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export default app;