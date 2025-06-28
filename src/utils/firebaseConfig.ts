// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAawKGNd9AL-cEolHgeJtCbVE8KYMPBoMA",
  authDomain: "wph-mockup.firebaseapp.com",
  projectId: "wph-mockup",
  storageBucket: "wph-mockup.firebasestorage.app",
  messagingSenderId: "1041573611062",
  appId: "1:1041573611062:web:103a26efc6362ede793a97",
  measurementId: "G-XYPQTDT8XX"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(firebaseApp);

export { auth, googleProvider, analytics };