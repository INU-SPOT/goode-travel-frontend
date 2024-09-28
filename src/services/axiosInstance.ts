import axios from "axios";
import { getMessaging, getToken } from "firebase/messaging";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
});

// accessToken 자동 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// accessToken 만료 시 재발급 요청
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // accessToken 만료 시 재발급 처리
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/v1/auth/reissue`,
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );

          const { accessToken, refreshToken: newRefreshToken } =
            response.data.data;

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }
      }
    }

    // FCM 토큰 만료 시 재발급 처리 및 서버로 전송
    if (
      error.response.status === 400 &&
      error.response.data.message ===
        "The registration token is not a valid FCM registration token"
    ) {
      try {
        const messaging = getMessaging();
        const token = await getToken(messaging, {
          vapidKey: process.env.REACT_APP_FCM_VAPID_KEY,
          serviceWorkerRegistration: await navigator.serviceWorker.ready,
        });

        if (token) {
          // 서버로 새로운 FCM 토큰 전송
          await axiosInstance.post(`/v1/fcm`, { fcmToken: token });
          console.log("토큰 재전송 성공");

          // 기존 요청 다시 시도
          return axiosInstance(originalRequest);
        } else {
          console.log("Failed to retrieve new FCM Token");
        }
      } catch (fcmError) {
        console.error("Error reissuing FCM token", fcmError);
        return Promise.reject(fcmError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

/* 아래는 사용 예시입니다.
import axiosInstance from "./axiosInstance";

const fetchData = async () => {
  try {
    const response = await axiosInstance.get("/some-protected-resource");
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

export default fetchData;
*/
