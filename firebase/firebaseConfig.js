import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, set, ref, get, child, onChildAdded, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getStorage, ref as Sref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyDwVuyrjGwHSa466waU0n3jioe2Ic-d-AU",
    authDomain: "products-39444.firebaseapp.com",
    databaseURL: "https://products-39444-default-rtdb.firebaseio.com",
    projectId: "products-39444",
    storageBucket: "products-39444.appspot.com",
    messagingSenderId: "1022679245031",
    appId: "1:1022679245031:web:75bac97627f0d8b90fc242"
  };

const app = initializeApp(firebaseConfig);

var auth = getAuth(app)
var db = getDatabase(app)
// var storage = getStorage();
var googleProvider = new GoogleAuthProvider()
var githubProvider = new GithubAuthProvider()


export {
    auth,
    db,
    getStorage,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    googleProvider,
    githubProvider,
    signInWithPopup,
    set,
    ref,
    get,
    child,
    Sref,
    uploadBytesResumable,
    getDownloadURL,
    push,
    onChildAdded
}