// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpIDT6Dmd6lwWoOgfUAnB6IHuD-W_wDGY",
  authDomain: "react-curso-529ff.firebaseapp.com",
  projectId: "react-curso-529ff",
  storageBucket: "react-curso-529ff.appspot.com",
  messagingSenderId: "601554113066",
  appId: "1:601554113066:web:b5edb2ecb845f106a669"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp );