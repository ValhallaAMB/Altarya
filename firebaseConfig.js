import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCBiARBOkVkFY79sJTP5GA6slT25dnSvaI",
  authDomain: "altarya-571ed.firebaseapp.com",
  projectId: "altarya-571ed",
  storageBucket: "altarya-571ed.firebasestorage.app",
  messagingSenderId: "352050324209",
  appId: "1:352050324209:web:fb2b421ec6f7619692bf50",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
// export const auth = getAuth(app);

export const usersCollection = collection(db, "users");
export const roomsCollection = collection(db, "rooms");
