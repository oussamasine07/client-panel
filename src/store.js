import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";


// Rducers
// @todo 
 

const firebaseConfig = {
    apiKey: "AIzaSyB9Xo4koZCUX2IE_VtyYFfbNqzoup7YA14",
    authDomain: "client-panel-2a201.firebaseapp.com",
    databaseURL: "https://client-panel-2a201.firebaseio.com",
    projectId: "client-panel-2a201",
    storageBucket: "client-panel-2a201.appspot.com",
    messagingSenderId: "275870617085",
    appId: "1:275870617085:web:86933356884a1823c75d94",
    measurementId: "G-B5XXPE8Z6S"
}

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  }

// initialize firebase instance
firebase.initializeApp(firebaseConfig)
// init firestore 
const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
}

firestore.settings(settings);

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase) // <- needed if using firestore
  )(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer, // <- needed if using firestore
    notify: notifyReducer,
    settings: settingsReducer
})

if (localStorage.getItem("settings") === null) {
  const settings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  }

  localStorage.setItem("settings", JSON.stringify(settings));

}

const initialState = { settings: JSON.parse(localStorage.getItem("settings")) };

const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;