// src/hooks/useAuth.ts
import { useEffect } from "react";
import { get_is_registered } from "../services/user";
import { useNavigate } from "react-router-dom";

// OAuth 로그인 후 url의 queryParam에서 token 가져오기 및 localStorage에 저장된 토큰 확인
const useAuth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const authenticateUser = async () => {
      // URL의 queryParams에서 accessToken과 refreshToken 가져오기
      const queryParams = new URLSearchParams(window.location.search);
      const accessTokenFromUrl = queryParams.get("accessToken");
      const refreshTokenFromUrl = queryParams.get("refreshToken");

      // URL에서 가져온 토큰이 있으면 localStorage에 저장
      if (accessTokenFromUrl && refreshTokenFromUrl) {
        localStorage.setItem("accessToken", accessTokenFromUrl);
        localStorage.setItem("refreshToken", refreshTokenFromUrl);
        // localStorage에서 accessToken 가져오기
        const accessToken = localStorage.getItem("accessToken");

        // accessToken이 있을 경우 get_is_registered 호출
        if (accessToken) {
          try {
            const response = await get_is_registered();

            // 만약 유저가 등록되지 않았다면 /mypage로 이동
            if (!response.data) {
              navigate("/mypage");
            }
          } catch (error) {
            console.error("Error checking registration status:", error);
          }
        }
        navigate("/");
      }
    };

    authenticateUser();
  }, [navigate]);
};

export default useAuth;
