import React from "react";
import styled from "styled-components";

interface TagButtonProps {
  text: string;
}

const TagButton: React.FC<TagButtonProps> = ({ text }) => {
  return (
    <StyledTagButton>
      <TextWrapper>{text}</TextWrapper>
    </StyledTagButton>
  );
};

export default TagButton;

const StyledTagButton = styled.div`
  height: 30px;
  width: 56px;
  background-color: #f6f6f6;
  border-radius: 13.31px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
`;

const TextWrapper = styled.div`
  color: #000000;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.33px;
  line-height: 17px;
  white-space: nowrap;
`;
