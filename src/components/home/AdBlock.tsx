import React from "react";
import styled from "styled-components";
import { COLOR } from "../../utils/color";
import carImage from "../../assets/images/main-palisade-24my-45side.png";

export default function AdBlock() {
  const handleClick = () => {
    window.location.href = process.env.REACT_APP_RENT_CAR_URL as string;
  };

  return (
    <Container>
      <AdWrapper onClick={handleClick}>
        <Title>
          {`${process.env.REACT_APP_RENT_CAR_NAME}에서 렌터카를 신청해보세요!`}
        </Title>
        <Image src={carImage} alt="렌터카 광고 이미지" />
      </AdWrapper>
      <Warning>
        이 포스팅은 제휴마케팅이 포함된 광고로 일정 커미션을 지급 받을 수
        있습니다.
      </Warning>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AdWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${COLOR.blue};
  border-radius: 13px;
  padding: 18px;
  box-sizing: border-box;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
`;

const Title = styled.div`
  font-size: 19px;
  font-weight: 600;
  text-align: center;
`;

const Image = styled.img`
  width: 60%;
  height: auto;
  object-fit: cover;
`;

const Warning = styled.div`
  margin-top: 10px;
  font-size: 10px;
`;
