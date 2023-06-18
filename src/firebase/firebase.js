import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDl1o5D3l2hbpHbPUQuOYgz7y9rvaAXRw",
  authDomain: "filmyverse-4d1c0.firebaseapp.com",
  projectId: "filmyverse-4d1c0",
  storageBucket: "filmyverse-4d1c0.appspot.com",
  messagingSenderId: "558041579861",
  appId: "1:558041579861:web:e5da0e41ca5a795c4c2fdc",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "users");

export default app;
