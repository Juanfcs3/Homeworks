import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDYIzPS83-sZF61p7rdb8PidMkeCuqzQHQ",
  authDomain: "parcial2-6c031.firebaseapp.com",
  projectId: "parcial2-6c031",
  storageBucket: "parcial2-6c031.firebasestorage.app",
  messagingSenderId: "899767761909",
  appId: "1:899767761909:web:f651bdfab62d8fdbab3ebc"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);
const db = getDatabase(app);

export { auth, db };
