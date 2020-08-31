import * as firebase from "firebase";
require("firebase/firestore");

export class Firebase {
  constructor() {
    this._firebaseConfig = {
      apiKey: "AIzaSyB08O4DxULFwt6g9zG5Oz6l5CCQ7qYBZxk",
      authDomain: "whatsapp-e4012.firebaseapp.com",
      databaseURL: "https://whatsapp-e4012.firebaseio.com",
      projectId: "whatsapp-e4012",
      storageBucket: "whatsapp-e4012.appspot.com",
      messagingSenderId: "185857447649",
      appId: "1:185857447649:web:05c294f6359818428909a0",
    };

    this.init();
  }

  init() {
    if (!this._initialize) {
      // Initialize Firebase
      firebase.initializeApp(this._firebaseConfig);

      firebase.firestore().settings({});

      this._initialize = true;
    }
  }

  static db() {
    return firebase.firestore();
  }

  static hd() {
    return firebase.storage();
  }
}
