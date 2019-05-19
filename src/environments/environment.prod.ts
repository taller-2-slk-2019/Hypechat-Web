export const environment = {
  production: true,
  baseUrl: 'https://slack-taller2.herokuapp.com/',
  mapsKey: process.env.MAPS_KEY,
  firebaseConfig: {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: "hypechat-2fee8.firebaseapp.com",
    databaseURL: "https://hypechat-2fee8.firebaseio.com",
    projectId: "hypechat-2fee8",
    storageBucket: "hypechat-2fee8.appspot.com",
    messagingSenderId: "1009732394195",
    appId: "1:1009732394195:web:8c24b08dca5353de"
  }
};
