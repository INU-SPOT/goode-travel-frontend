import React from "react";
import styled from "styled-components";
import TagButton from "./TagButton";

const GoodeListBlock = () => {
  return (
    <>
      <Title>더 많은 굳이? 보기 &gt;</Title>
      <GridContainer>
        <TagButton text="먹거리" />
        <TagButton text="쉴거리" />
        <TagButton text="볼거리" />
        <TagButton text="놀거리" />
        <TagButton text="살거리" />
        <TagButton text="전체" />
      </GridContainer>
    </>
  );
};

export default GoodeListBlock;

const Title = styled.h2`
  font-size: 15px;
  margin: 0 0 9px 0;
  text-align: right;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  justify-items: center;
  align-items: center;
`;
