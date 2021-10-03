import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApzetCUqCiCrzBmu6FW2pZ-T2Uyuu8ZhI",
  authDomain: "slacktesting-3-0.firebaseapp.com",
  projectId: "slacktesting-3-0",
  storageBucket: "slacktesting-3-0.appspot.com",
  messagingSenderId: "978923671449",
  appId: "1:978923671449:web:d06e27011ee9e540c90d08",
};

initializeApp(firebaseConfig);
export default getFirestore();
