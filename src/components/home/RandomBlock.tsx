import React from "react";
import styled from "styled-components";
import { COLOR } from "../../utils/color";
import { useNavigate } from "react-router-dom";

export default function RandomBlock() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/random-goode");
  };

  return (
    <RandomWrapper onClick={handleClick}>
      <Title>즉흥 굳이 뽑기</Title>
    </RandomWrapper>
  );
}

const RandomWrapper = styled.div`
  height: 100%;
  cursor: pointer;
  background-color: ${COLOR.green};
  justify-content: center;
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
