// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPtOe0sn_jXcumPcC-8zFoa_yhZDNjXeE",
  authDomain: "mcpl-ban.firebaseapp.com",
  projectId: "mcpl-ban",
  storageBucket: "mcpl-ban.firebasestorage.app",
  messagingSenderId: "517911512575",
  appId: "1:517911512575:web:1eb8a5df704556fd58d3ca",
  measurementId: "G-GM4KDT97FZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);