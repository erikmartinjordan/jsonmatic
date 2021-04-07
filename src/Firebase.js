import firebase from 'firebase/app';
import 'firebase/firestore';

///////////////////////////////////////////////
//Modify this line to set the environment
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
export let environment = 'PRE';
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
var configPRE = {
    apiKey: "AIzaSyB1eLRPMC5_ZdPQ6Hxz6oVSOxI2ebCyakM",
    authDomain: "jsonmatic-pre.firebaseapp.com",
    projectId: "jsonmatic-pre",
    storageBucket: "jsonmatic-pre.appspot.com",
    messagingSenderId: "399731256775",
    appId: "1:399731256775:web:1530bd3dcb14a5776f3de2"
};

var configPRO = {
    apiKey: "AIzaSyAxDzeibKdWIUmO8rV9KMpRFTt07EpU_yM",
    authDomain: "jsonmatic-pro.firebaseapp.com",
    projectId: "jsonmatic-pro",
    storageBucket: "jsonmatic-pro.appspot.com",
    messagingSenderId: "724237445395",
    appId: "1:724237445395:web:6b75fa3f918ad4833bd2e6"
};

firebase.initializeApp(environment === 'PRE' ? configPRE : configPRO);

export default firebase;