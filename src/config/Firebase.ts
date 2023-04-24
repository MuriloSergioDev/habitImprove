import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
// import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID } from 'react-native-dotenv'

const firebaseConfig = {
  apiKey: "AIzaSyD17LGQwxAAyWUsK1oBM4gw3c1V6C8MnEI",
  authDomain: "habitimprove-34a28.firebaseapp.com",
  projectId: "habitimprove-34a28",
  storageBucket: "habitimprove-34a28.appspot.com",
  messagingSenderId: "180582398394",
  appId: "1:180582398394:web:249c6b1bfbfa9abcfb4583",
  measurementId: "G-5PEDJE7JJT",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };

