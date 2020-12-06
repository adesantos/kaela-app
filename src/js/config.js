import firebase from "firebase";
import "firebase/database";
import "firebase/storage";

const config = {
	apiKey: "AIzaSyDQ58hDJwV1XhDpbYsrvmITY8EagCXZ398",
	authDomain: "kaela-1a854.firebaseapp.com",
	databaseURL: "https://kaela-1a854.firebaseio.com",
	projectId: "kaela-1a854",
	storageBucket: "kaela-1a854.appspot.com",
	messagingSenderId: "170617101253",
	appId: "1:170617101253:web:e1d40844568293783c89ac",
	measurementId: "G-GE3NL6BVM5"
};

firebase.initializeApp(config);

export default firebase;
