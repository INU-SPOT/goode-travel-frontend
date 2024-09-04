import { useEffect } from "react";

// OAuth 로그인 후 url의 queryParam에서 token 가져오기
const useAuth = () => {
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get("accessToken");
    const refreshToken = queryParams.get("refreshToken");
    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      const redirectPath = "/";
      window.location.href = redirectPath;
    }
  }, []);
};

export default useAuth;
