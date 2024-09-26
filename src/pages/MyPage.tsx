import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyPageHeader from "../components/mypage/MyPageHeader";
import MyPageContent from "../components/mypage/MyPageContent";

export default function MyPage() {
  const navigate = useNavigate();
  const [hasToken, setHasToken] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setHasToken(false); // 토큰이 없으면 로그인 버튼을 보여줌
    }
  }, []);

  return (
    <MyPageContainer>
      <MyPageHeader />
      {hasToken ? (
        <MyPageContent />
      ) : (
        <Login onClick={() => navigate("/login")}>로그인이 필요합니다!</Login>
      )}
    </MyPageContainer>
  );
}

const MyPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Login = styled.button`
  background-color: #e4f1e1;
  border-radius: 12px;
  padding: 20px;
  margin-top: 50%;
  box-shadow: 0px 4px 4px 0px #00000040;
  border: 0;
  align-self: center;
`;
