import { createApp } from 'vue'
import App from './App.vue'
import { initializeApp } from "firebase/app";
import './assets/main.css'

initializeApp({
    apiKey: "AIzaSyDhy9Wq7T-Cxiz_2frS7By9piWVc_W2K0E",
    authDomain: "discord-clone-7b7fc.firebaseapp.com",
    databaseURL: "https://discord-clone-7b7fc.firebaseio.com",
    projectId: "discord-clone-7b7fc",
    storageBucket: "discord-clone-7b7fc.appspot.com",
    messagingSenderId: "736391802140",
    appId: "1:736391802140:web:ae9ef38fdd717eb22a5ed9"
})

createApp(App).mount('#app')