import styled from "styled-components";
import LoginButtons from "../components/login/LoginButtons";

export default function LoginPage() {
  return (
    <LoginContainer>
      <h2>굳이? 로그인</h2>
      <LoginButtons />
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
