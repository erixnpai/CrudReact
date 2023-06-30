import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABMzub_Yc4yYKDhCxfM-HBKsD8UePN4S4",
  authDomain: "crud-react-d2cd5.firebaseapp.com",
  projectId: "crud-react-d2cd5",
  storageBucket: "crud-react-d2cd5.appspot.com",
  messagingSenderId: "53084862879",
  appId: "1:53084862879:web:af4a145f70056cc0afa5aa"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);