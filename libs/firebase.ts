// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC7gJCqZ8DaTD0EDjeC-4Gy6cd6vBTErYc",
    authDomain: "cozie-shop.firebaseapp.com",
    projectId: "cozie-shop",
    storageBucket: "cozie-shop.appspot.com",
    messagingSenderId: "468598741595",
    appId: "1:468598741595:web:cb2ac87cb8195d5aa53d7e",
    measurementId: "G-V4LCPRFDKE"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);

export default firebaseApp;
