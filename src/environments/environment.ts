// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const config = {

  apiKey: "AIzaSyBYn3ZLB97VgxwDzjrP4wvJYb71-xc2YPc",
  authDomain: "holidays-300107.firebaseapp.com",
  projectId: "holidays-300107",
  storageBucket: "holidays-300107.appspot.com",
  messagingSenderId: "207040885677",
  appId: "1:207040885677:web:7bd653d95613046a2da724"
};


export const environment = {
envName: 'dev',
production: false,
standalone: true,
is4dHost: false,
serverUrl: 'http://localhost:8081',
projectId: '4DCD3CD18C68456388537415CE4BE594',
firebaseConfig: config
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
