import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC_QjMM-hmhrBCGLJ7MCod2_zQfjyX7z6g",
  authDomain: "my-comic-web-app.firebaseapp.com",
  projectId: "my-comic-web-app",
  storageBucket: "my-comic-web-app.appspot.com",
  messagingSenderId: "646834791300",
  appId: "1:646834791300:web:4d6cbce9456d4c0868b3d1"
};

const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
