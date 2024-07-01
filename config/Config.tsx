import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyA8vUN0i2qNu4CaDAJK8F6xDlQlEHQ-uEA",
    authDomain: "app-dos-8752d.firebaseapp.com",
    projectId: "app-dos-8752d",
    storageBucket: "app-dos-8752d.appspot.com",
    messagingSenderId: "682612200335",
    appId: "1:682612200335:web:5283e4ab8dc3d81cf231fa"
  };
  const app = initializeApp(firebaseConfig);
  

export const db = getDatabase(app);