import styled from "styled-components";
import LoginButtons from "../components/login/LoginButtons";
import Intro from "../components/Intro";

export default function LoginPage() {
  return (
    <LoginContainer>
      <Intro />
      <LoginButtons />
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  position: relative;
  width: 100%;
  height: 90svh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
