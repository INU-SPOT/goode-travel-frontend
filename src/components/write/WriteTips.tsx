import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as XIcon } from "../../assets/icons/x-icon.svg";

export default function WriteTips() {
  const [isVisible, setIsVisible] = useState(false);

  const tips = [
    "일정 추가 후, 일정의 제목을 드래그하면 일정 순서가 변경됩니다.",
    "글 작성 중 30초마다 자동 임시 저장됩니다.",
    "임시 저장된 글은 브라우저에 저장되며, 다른 기기에서 불러올 수 없습니다.",
    "이미지는 임시 저장되지 않습니다.",
    "매너 있는 글 작성 부탁드려요 🙏",
  ];

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <TipButton onClick={toggleVisibility}>❔</TipButton>
      {isVisible && (
        <Overlay onClick={toggleVisibility}>
          <TipsContainer>
            <StyledXIcon onClick={toggleVisibility}>닫기</StyledXIcon>
            {tips.map((tip, index) => (
              <p key={index}>❗️ {tip}</p>
            ))}
          </TipsContainer>
        </Overlay>
      )}
    </>
  );
}

const TipButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #abe5e3;
  border: none;
  border-radius: 100%;
  width: 60px;
  height: 60px;
  font-size: 24px;
  z-index: 1000;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const TipsContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 90svw;
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;

const StyledXIcon = styled(XIcon)`
  align-self: flex-end;
  width: 14px;
  height: 14px;
  margin: 4px;
`;
