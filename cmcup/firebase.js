import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDHWfnv9km1H6Fq1QV-kMSe4DI1LMTr3jw",
    authDomain: "cmc-results.firebaseapp.com",
    databaseURL: "https://cmc-results-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cmc-results",
    storageBucket: "cmc-results.appspot.com",
    messagingSenderId: "783150826234",
    appId: "1:783150826234:web:32b2f33f52793c94b27f43",
    measurementId: "G-XX2Y4TEQRV"
  };  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase();