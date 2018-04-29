  import firebase from 'firebase'
// Initialize Firebase
  const config = {
    apiKey: "AIzaSyDC5Dnta7FZt7kRRU2idGboIROnmmwhvEU",
    authDomain: "godinnersd.firebaseapp.com",
    databaseURL: "https://godinnersd.firebaseio.com",
    projectId: "godinnersd",
    storageBucket: "godinnersd.appspot.com",
    messagingSenderId: "686757133111"
  };
  export default firebase.initializeApp(config);