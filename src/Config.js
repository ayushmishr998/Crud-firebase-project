import * as firebase from 'firebase';

const settings = {timestampsInSnapshots:true}
var firebaseConfig = {
    apiKey: "AIzaSyDlhd89wpIKBMMJrA2k-f0DqBjArpweFPc",
    authDomain: "crudproject-828ed.firebaseapp.com",
    databaseURL: "https://crudproject-828ed.firebaseio.com",
    projectId: "crudproject-828ed",
    storageBucket: "crudproject-828ed.appspot.com",
    messagingSenderId: "706804152465",
    appId: "1:706804152465:web:df9beb1e649f9fa7c7a730"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings(settings);
  export default firebase;