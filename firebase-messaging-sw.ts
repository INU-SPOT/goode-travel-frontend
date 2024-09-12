import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FCM_APIKEY}`,
  authDomain: `${process.env.REACT_APP_FCM_AUTHDOMAIN}`,
  projectId: `${process.env.REACT_APP_FCM_PROJECTID}`,
  storageBucket: `${process.env.REACT_APP_FCM_STORAGEBUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_FCM_MESSAGINGSENDERID}`,
  appId: `${process.env.REACT_APP_FCM_APPID}`,
  measurementId: `${process.env.REACT_APP_FCM_MEASUREMENTID}`,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
