import styled from "styled-components";
import { authServices } from "../../data/authServices";
import GoogleIcon from "../../assets/icons/google.svg";
import NaverIcon from "../../assets/icons/naver.svg";
import KakaoIcon from "../../assets/icons/kakao.svg";

export default function LoginButtons() {
  const iconMap = {
    google: GoogleIcon,
    naver: NaverIcon,
    kakao: KakaoIcon,
  };

  return (
    <ButtonContainer>
      {authServices.map((authService) => {
        return (
          <LoginButton
            key={authService.service}
            backgroundColor={authService.backgroundColor}
            textColor={authService.textColor}
            borderColor={authService.borderColor}
            onClick={() => (window.location.href = authService.url)}
          >
            <ContentArea>
              <img src={iconMap[authService.service]} />
              <span>{authService.label}</span>
            </ContentArea>
          </LoginButton>
        );
      })}
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const LoginButton = styled.button<{
  backgroundColor: string;
  textColor: string;
  borderColor: string;
}>`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.textColor};
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid ${(props) => props.borderColor};
`;

const ContentArea = styled.div`
  width: 140px;
  display: flex;
  align-items: center;
  gap: 20px;
  img {
    width: 20px;
    height: 20px;
  }
`;
