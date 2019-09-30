import Rebase from "re-base";
import firebase from "firebase/app";
import 'firebase/database';

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyDCw-EmjBKu84_4gTPJxV-bwFj_nCHoa6c",
	authDomain: "catch-of-the-day-tutoria-39676.firebaseapp.com",
	databaseURL: "https://catch-of-the-day-tutoria-39676.firebaseio.com"
});


const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

//This is a default export
export default base;