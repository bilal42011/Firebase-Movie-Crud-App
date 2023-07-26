import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAs9288h3BLciXgFYGyNY2amKsprYrYCXc",
    authDomain: "fir-crud-app-b2c14.firebaseapp.com",
    projectId: "fir-crud-app-b2c14",
    storageBucket: "fir-crud-app-b2c14.appspot.com",
    messagingSenderId: "889475954229",
    appId: "1:889475954229:web:982d16a00d892b740ce37c",
    measurementId: "G-9TTTK448F3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);


