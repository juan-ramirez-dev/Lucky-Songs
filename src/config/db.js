import firebase from "firebase/app"
import 'firebase/firestore'

const confi = {
  apiKey: "AIzaSyBgWTg-VyD1nChmIE1vJ9Bch-meAPQLzes",
  authDomain: "reproductor-4a6a5.firebaseapp.com",
  projectId: "reproductor-4a6a5",
  storageBucket: "reproductor-4a6a5.appspot.com",
  messagingSenderId: "500509689569",
  appId: "1:500509689569:web:35e78b61c637db09b219a0"
}

const fb = firebase.initializeApp(confi);

const db = {
  Config : confi,
  firestore : fb.firestore()
}

export default db