


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey:import.meta.env.VITE__FIREBASE_API_KEY,
//   authDomain: "mern-blog-4ead2.firebaseapp.com",
//   projectId: "mern-blog-4ead2",
//   storageBucket: "mern-blog-4ead2.appspot.com",
//   messagingSenderId: "857339328366",
//   appId: "1:857339328366:web:48a68cf519b6f2e78b337f"
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  
  apiKey:import.meta.env.VITE__FIREBASE_API_KEY,

  authDomain: "task-manager-d9b92.firebaseapp.com",
  projectId: "task-manager-d9b92",
  storageBucket: "task-manager-d9b92.appspot.com",
  messagingSenderId: "76269058889",
  appId: "1:76269058889:web:fbfd2e28d96df54f87f898"
};

// // Initialize Firebase
export const app = initializeApp(firebaseConfig);