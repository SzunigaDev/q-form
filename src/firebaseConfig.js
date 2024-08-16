// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Configuración de tu aplicación Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC-pzKvziDcKDQ-4o0KMVH7IAEVyxzRF44",
  authDomain: "form-test-9a6a5.firebaseapp.com",
  projectId: "form-test-9a6a5",
  storageBucket: "form-test-9a6a5.appspot.com",
  messagingSenderId: "545966148240",
  appId: "1:545966148240:web:f310236ea7674bed392615"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta el servicio de autenticación
export const auth = getAuth(app);
