import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'


const firebaseConfig = {
    apiKey: 'AIzaSyBvQ1QlHAwZ91Vk7Hg2w2d1mzaUdbv62gs',
    authDomain: 'vba-sensei.firebaseapp.com',
    projectId: 'vba-sensei',
    storageBucket: 'vba-sensei.appspot.com',
    messagingSenderId: '487786726058',
    appId: '1:487786726058:web:49c009d2171e6de44ac6d3',
    measurementId: 'G-GSS4RP019D'
}

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { app, db }