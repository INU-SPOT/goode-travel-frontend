import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useGoodesStore from "../../store/uesGoodesStore";

interface TagButtonProps {
  text: string;
}

export default function TagButton({ text }: TagButtonProps) {
  const navigate = useNavigate();
  const { setFilters } = useGoodesStore();

  const handleClick = () => {
    if (text === "전체") {
      setFilters({
        theme: [],
        metropolitanGovernments: [],
        localGovernments: [],
      });
    } else {
      setFilters({
        theme: [text],
        metropolitanGovernments: [],
        localGovernments: [],
      });
    }
    navigate(`/goode`);
  };

  return (
    <StyledTagButton onClick={handleClick}>
      <TextWrapper>{text}</TextWrapper>
    </StyledTagButton>
  );
}

const StyledTagButton = styled.div`
  height: 28px;
  width: 56px;
  background-color: #f6f6f6;
  border-radius: 16px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
  cursor: pointer;
`;

const TextWrapper = styled.div`
  color: #000000;
  font-size: 13px;
`;
