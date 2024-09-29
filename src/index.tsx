// // import React, { useEffect } from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// import GlobalStyle from "./globalStyles";
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import axiosInstance from "./services/axiosInstance";

// // Firebase 설정
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FCM_API_KEY,
//   authDomain: process.env.REACT_APP_FCM_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FCM_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FCM_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FCM_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FCM_APP_ID,
//   measurementId: process.env.REACT_APP_FCM_MEASUREMENT_ID,
// };

// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// async function requestPermissionAndSendToken() {
//   try {
//     const permission = await Notification.requestPermission();
//     if (permission === "denied") {
//       console.log("Notification permission denied");
//       return;
//     }
//     console.log("Notification permission granted");

//     // 서비스 워커가 등록된 후 FCM 토큰을 요청
//     const token = await getToken(messaging, {
//       vapidKey: process.env.REACT_APP_FCM_VAPID_KEY,
//       serviceWorkerRegistration: await navigator.serviceWorker.ready,
//     });

//     if (token) {
//       localStorage.setItem("fcmToken", token);

//       try {
//         // 토큰을 서버로 전송
//         await axiosInstance.post(`/v1/fcm`, { fcmToken: token });
//         console.log("FCM 토큰 전송");
//       } catch (error) {
//         console.error("Error sending FCM token to server", error);

//         // 에러가 발생하면 토큰을 재발급 후 다시 전송
//         console.log("Attempting to reissue FCM token");
//         const newToken = await getToken(messaging, {
//           vapidKey: process.env.REACT_APP_FCM_VAPID_KEY,
//           serviceWorkerRegistration: await navigator.serviceWorker.ready,
//         });

//         if (newToken) {
//           localStorage.setItem("fcmToken", newToken);
//           // 새로 발급받은 토큰을 서버로 다시 전송
//           await axiosInstance.post(`/v1/fcm`, { fcmToken: newToken });
//           console.log("FCM 토큰 재발급 후 전송");
//         } else {
//           console.log("Failed to retrieve new FCM Token");
//         }
//       }
//     } else {
//       console.log("Failed to retrieve FCM Token");
//     }

//     // Foreground 메시지 처리
//     onMessage(messaging, (payload) => {
//       console.log("Message received: ", payload);
//     });
//   } catch (error) {
//     console.error(
//       "Error fetching FCM token or sending it to the server",
//       error
//     );
//   }
// }

// // 서비스 워커 등록
// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register(`${process.env.PUBLIC_URL}/firebase-messaging-sw.js`)
//     .then((registration) => {
//       console.log("Service Worker registered with scope: ", registration.scope);
//       requestPermissionAndSendToken(); // 서비스 워커 등록 후 호출
//     })
//     .catch((err) => {
//       console.log("Service Worker registration failed: ", err);
//     });
// }

// // 잘못된 FCM 토큰을 전송하는 테스트 코드 (주석 처리)
// async function testInvalidToken() {
//   try {
//     // 잘못된 토큰을 의도적으로 설정
//     const invalidToken = "invalid-fcm-token";
//     localStorage.setItem("fcmToken", invalidToken);

//     // 잘못된 토큰을 서버로 전송
//     await axiosInstance.post(`/v1/fcm`, { fcmToken: invalidToken });
//     console.log("Sent invalid FCM token for testing");
//   } catch (error) {
//     console.error("Error sending invalid FCM token for testing", error);
//   }
// }

// testInvalidToken();

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );
// root.render(
//   <>
//     <GlobalStyle />
//     <App />
//   </>
// );

// reportWebVitals();
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

// async function requestPermissionAndSendToken() {
//   try {
//     const permission = await Notification.requestPermission();
//     if (permission === "denied") {
//       console.log("Notification permission denied");
//       return;
//     }
//     console.log("Notification permission granted");

//     // 정상적인 FCM 토큰 발급 (전송하지 않음)
//     const token = await getToken(messaging, {
//       vapidKey: process.env.REACT_APP_FCM_VAPID_KEY,
//       serviceWorkerRegistration: await navigator.serviceWorker.ready,
//     });

//     if (token) {
//       console.log("정상적인 FCM 토큰 발급 완료:", token);
//       localStorage.setItem("fcmToken", token);
//     } else {
//       console.log("정상적인 FCM 토큰 발급 실패");
//     }

//     // Foreground 메시지 처리
//     onMessage(messaging, (payload) => {
//       console.log("Message received: ", payload);
//     });
//   } catch (error) {
//     console.error("FCM 토큰 발급 중 오류 발생:", error);
//   }
// }

// 테스트용 잘못된 FCM 토큰 전송 및 재발급 테스트
async function testInvalidToken() {
  try {
    // 잘못된 토큰을 의도적으로 설정
    const invalidToken = "invalid-fcm-token";
    localStorage.setItem("fcmToken", invalidToken);

    // 잘못된 토큰을 서버로 전송
    const response = await axiosInstance.post(`/v1/fcm`, {
      fcmToken: invalidToken,
    });
    console.log(`잘못된 FCM 토큰(${invalidToken}}) 전송 완료`);
    console.log(response);
  } catch (error) {
    console.error("잘못된 FCM 토큰 전송 중 오류 발생:", error);

    // 에러가 발생하면 토큰을 재발급 후 다시 전송
    console.log("잘못된 토큰 감지, FCM 토큰 재발급 시도");
    const newToken = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_FCM_VAPID_KEY,
      serviceWorkerRegistration: await navigator.serviceWorker.ready,
    });

    if (newToken) {
      console.log("새로운 FCM 토큰 발급 완료:", newToken);
      localStorage.setItem("fcmToken", newToken);
      // 새로 발급받은 토큰을 서버로 다시 전송
      await axiosInstance.post(`/v1/fcm`, { fcmToken: newToken });
      console.log("재발급된 FCM 토큰 전송 완료");
    } else {
      console.log("새로운 FCM 토큰 발급 실패");
    }
  }
}

// 테스트용 잘못된 FCM 토큰 전송
testInvalidToken();

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
