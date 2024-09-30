import React from "react";
import styled from "styled-components";

interface SharedProps {
  goode: string;
  image?: string;
  onClick?: () => void;
}

export default function ImageBlock({ goode, image, onClick }: SharedProps) {
  return (
    <ImageWrapper image={image}>
      <ImageGoode>{goode}</ImageGoode>
    </ImageWrapper>
  );
}

const ImageWrapper = styled.div<{ image?: string }>`
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  border-radius: 13px;
  box-sizing: border-box;
  padding: 0 3px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
`;

const ImageGoode = styled.h3`
  max-width: 100%;
  position: absolute;
  font-size: 15px;
  top: 15px;
  font-weight: 900;
  color: white;
  margin: 0;
  padding: 4px 8px;
  border-radius: 4px;
  word-break: keep-all;
  overflow-wrap: break-word;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
`;
