import React from "react";
import styled from "styled-components";
import { COLOR } from "../../utils/color";
import carImage from "../../assets/images/main-palisade-24my-45side.png";

interface AdBlockProps {
  onClick?: () => void; // 비어있는 onClick 핸들러
}

export default function AdBlock({ onClick }: AdBlockProps) {
  return (
    <AdWrapper>
      <Title>현재 렌터카 최저가는?</Title>
      <Image src={carImage} alt="렌터카 광고 이미지" />
    </AdWrapper>
  );
}

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
  font-size: 21px;
  font-weight: 600;
  text-align: center;
`;

const Image = styled.img`
  width: 60%;
  height: auto;
  object-fit: cover;
`;
