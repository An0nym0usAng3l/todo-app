const initializeApp = require("firebase/app")
const getAuth = require("firebase/auth");
const getFirestore = require("firebase/firestore");

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "todo-task-b4f63.firebaseapp.com",
    projectId: "todo-task-b4f63",
    storageBucket: "todo-task-b4f63.appspot.com",
    messagingSenderId: "388540018928",
    appId: process.env.API_ID,
    measurementId: "G-V2RQ857SPJ"
};

const firebaseApp = initializeApp.initializeApp(firebaseConfig);

const db = getFirestore.getFirestore(firebaseApp);

module.exports = { db };