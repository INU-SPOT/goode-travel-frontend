import React from "react";
import styled from "styled-components";
import TagButton from "./TagButton";

const GoodeListBlock = () => {
  return (
    <GoodeListWrapper>
      <Title>더 많은 굳이? 보기 &gt;</Title>
      <ButtonContainer>
        <TagButton text="먹거리" />
        <TagButton text="쉴거리" />
        <TagButton text="볼거리" />
        <TagButton text="놀거리" />
        <TagButton text="살거리" />
        <TagButton text="전체" />
      </ButtonContainer>
    </GoodeListWrapper>
  );
};

export default GoodeListBlock;

const GoodeListWrapper = styled.div`
  height: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 800;
  text-align: right;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  justify-items: center;
  align-items: center;
`;
