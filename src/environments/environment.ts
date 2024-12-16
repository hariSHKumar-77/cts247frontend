// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyAm4VXTl0wkDICooUJdWmzqOS8M_N86WAA",
    authDomain: "cts247-7a4ae.firebaseapp.com",
    databaseURL:"https://cts247-7a4ae-default-rtdb.firebaseio.com",
    projectId: "cts247-7a4ae",
    storageBucket: "cts247-7a4ae.appspot.com",
    messagingSenderId: "741724772073",
    appId: "1:741724772073:web:4e3390abd0bc8415170278"
  }
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase
// const app = initializeApp(firebaseConfig);