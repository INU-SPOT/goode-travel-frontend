import React, { useRef, useState } from "react";
import styled from "styled-components";
import { COLOR } from "../../utils/color";

interface FolderProps {
  user: string;
  title?: string[];
  details?: string[];
}

const FolderBlock: React.FC<FolderProps> = ({ user, title, details }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const startX = useRef(0);
  const scrollStartPosition = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    if (containerRef.current) {
      scrollStartPosition.current = containerRef.current.scrollLeft;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (containerRef.current) {
      const deltaX = e.touches[0].clientX - startX.current;
      containerRef.current.scrollLeft = scrollStartPosition.current - deltaX;
    }
  };

  const handleTouchEnd = () => {
    if (containerRef.current) {
      const blockWidth = containerRef.current.offsetWidth * 0.7 + 18; // 블록의 width와 gap 반영
      const scrollLeft = containerRef.current.scrollLeft;
      const newIndex = Math.round(scrollLeft / blockWidth);
      setActiveIndex(newIndex);
      containerRef.current.scrollTo({
        left: newIndex * blockWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <OuterContainer>
      <Title>{user}님의 저장된 리스트</Title>
      <HorizontalScrollContainer
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {[...Array(5)].map((_, index) => (
          <Block
            key={index}
            position={index}
            totalBlocks={5}
            isNext={activeIndex === index - 1}
          >
            Box {index + 1}
          </Block>
        ))}
      </HorizontalScrollContainer>
    </OuterContainer>
  );
};

export default FolderBlock;

interface BlockProps {
  position: number;
  totalBlocks: number;
  isNext: boolean;
}

const OuterContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin: 0 -24px; */
`;

const Title = styled.div`
  flex-grow: 1.5;
  font-size: 19px;
  font-weight: bold;
  /* margin: 0 0 0 24px; */
  align-self: flex-start;
`;

const HorizontalScrollContainer = styled.div`
  height: 100%;
  display: flex;
  overflow-x: hidden;
  scroll-snap-type: x mandatory;
  gap: 18px;
  touch-action: pan-x; /* 가로 스와이프 동작을 위한 설정 */
  align-items: center;
`;

const Block = styled.div<BlockProps>`
  height: 80%;
  flex: 0 0 70%;
  background-color: ${COLOR.green};
  border-radius: 16px;
  padding: 18px;
  box-sizing: border-box;
  scroll-snap-align: center;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);

  /* ${({ position }) =>
    position === 0 &&
    `
    margin-left: 24px;
  `}

  ${({ position, totalBlocks }) =>
    position === totalBlocks - 1 &&
    `
    margin-right: 24px;
  `} */
`;
