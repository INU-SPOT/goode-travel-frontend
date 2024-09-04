import styled, { keyframes } from "styled-components";
import Background from "../assets/images/KakaoTalk_Photo_2024-08-07-20-33-27.png";

export default function Intro() {
  return (
    <StyledIntro>
      <TextWrapper>
        <StyledText color="#FFFFFF" fontSize="40px" delay="0s">
          굳이?
        </StyledText>
        <StyledText color="#ABE5E3" fontSize="70px" delay="0.5s">
          성심당
        </StyledText>
        <StyledText color="#FFFFFF" fontSize="30px" delay="1s">
          가서
        </StyledText>
        <StyledText color="#FF9900" fontSize="60px" delay="1.5s">
          망고시루
        </StyledText>
        <StyledText color="#FFFFFF" fontSize="40px" delay="2s">
          먹기
        </StyledText>
      </TextWrapper>
      <Overlay />
      <StyledImage src={Background} alt="Background" />
    </StyledIntro>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledIntro = styled.div`
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const TextWrapper = styled.div`
  flex: 1;
  margin-top: 25%;
  width: 80%;
  display: flex;
  flex-direction: column;
`;

interface StyledTextProps {
  color: string;
  fontSize: string;
  delay: string;
}

const StyledText = styled.p<StyledTextProps>`
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  margin: 0;
  font-weight: 700;
  opacity: 0;
  animation: ${fadeIn} 1s forwards;
  animation-delay: ${(props) => props.delay};
`;

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: -1;
`;

const StyledImage = styled.img`
  position: fixed;
  z-index: -2;
  height: 100%;
`;
