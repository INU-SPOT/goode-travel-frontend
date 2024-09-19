import axios from "axios";

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

    // originalRequest._retry는 Axios 인터셉터 내에서 토큰이 만료된 경우 재요청을 한 번만 시도하기 위해 사용하는 플래그
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          // refreshToken을 헤더에 추가하여 재발급 요청
          const response = await axios.post(
            "/v1/auth/reissue",
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );

          const { accessToken, refreshToken: newRefreshToken } = response.data;

          // 새로 받은 accessToken과 refreshToken을 저장
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          // 원래 요청에 새 accessToken을 넣어 다시 시도
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // refreshToken이 유효하지 않거나 재발급 실패 시 로그아웃 처리
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login"; // 로그인 페이지로 리다이렉트
        }
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
