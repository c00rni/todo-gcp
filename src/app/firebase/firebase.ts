//import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, onAuthStateChanged, User, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export function signInWithGoogle() {
    return signInWithPopup(auth, new GoogleAuthProvider());
}

export function signOut() {
    return auth.signOut();
}

export function onAuthStateChangedHelper(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
}

//Create todo

//Read todo from firebase
export async function getTasks() {
    const uid = auth.currentUser?.uid;
    if (uid) {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            console.log("No such document.");
        } else {
            return docSnap.data();
        }
    }
}

interface Tasks {
    id: number;
    text: string;
    isCompleted: boolean;
}

//Update todo in firebase
export async function updateTasks(tasks: Array<Tasks>) {
    const uid = auth.currentUser?.uid;
    if (uid) {
        await setDoc(doc(db, "users", uid), {
            tasks: tasks.map(task => {
                return {text: task.text, isCompleted: task.isCompleted}
            })
        });
    }
}
//Delete toto