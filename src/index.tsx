// import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "./globalStyles";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import axiosInstance from "./services/axiosInstance";

// Firebase 설정
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FCM_API_KEY,
  authDomain: process.env.REACT_APP_FCM_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FCM_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FCM_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FCM_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FCM_APP_ID,
  measurementId: process.env.REACT_APP_FCM_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

async function requestPermissionAndSendToken() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "denied") {
      console.log("Notification permission denied");
      return;
    }
    console.log("Notification permission granted");

    // 서비스 워커가 등록된 후 FCM 토큰을 요청
    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_FCM_VAPID_KEY,
      serviceWorkerRegistration: await navigator.serviceWorker.ready,
    });

    if (token) {
      localStorage.setItem("fcmToken", token);
      // 토큰을 서버로 전송
      await axiosInstance.post(`/v1/fcm`, { fcmToken: token });
    } else {
      console.log("Failed to retrieve FCM Token");
    }

    // Foreground 메시지 처리
    onMessage(messaging, (payload) => {
      console.log("Message received: ", payload);
    });
  } catch (error) {
    console.error(
      "Error fetching FCM token or sending it to the server",
      error
    );
  }
}

// 서비스 워커 등록
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register(`${process.env.PUBLIC_URL}/firebase-messaging-sw.js`)
    .then((registration) => {
      console.log("Service Worker registered with scope: ", registration.scope);
      requestPermissionAndSendToken(); // 서비스 워커 등록 후 호출
    })
    .catch((err) => {
      console.log("Service Worker registration failed: ", err);
    });
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <GlobalStyle />
    <App />
  </>
);

reportWebVitals();
