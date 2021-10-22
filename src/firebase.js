import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfQ7Hj6HX8JCzzZcHqniMmxzyUWWn8u-k",
  authDomain: "slack-45bda.firebaseapp.com",
  projectId: "slack-45bda",
  storageBucket: "slack-45bda.appspot.com",
  messagingSenderId: "73045143908",
  appId: "1:73045143908:web:1f4d7255fde12532738a71",
};

initializeApp(firebaseConfig);
export default getFirestore();
