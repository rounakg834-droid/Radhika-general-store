import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXtfjije3aCaCbkH-5JzbWfd6CxOXjdGg",
  authDomain: "radhika-general-store.firebaseapp.com",
  projectId: "radhika-general-store",
  storageBucket: "radhika-general-store.firebasestorage.app",
  messagingSenderId: "166296083797",
  appId: "1:166296083797:web:501fd86f4153a5331523dc",
  measurementId: "G-PL236T358M"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
