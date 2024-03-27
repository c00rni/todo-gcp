import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, onAuthStateChanged, User, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDuqeH4VXItls85q3FIX6_7UO-JPoRowAo",
  authDomain: "todo-16e41.firebaseapp.com",
  projectId: "todo-16e41",
  storageBucket: "todo-16e41.appspot.com",
  messagingSenderId: "1006187199233",
  appId: "1:1006187199233:web:0099b87abdf3fdcd1d3900",
  measurementId: "G-VQXTZHRSQ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

export function signInWithGoogle() {
    return signInWithPopup(auth, new GoogleAuthProvider());
}

export function signOut() {
    return auth.signOut();
}

export function onAuthStateChangedHelper(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
}