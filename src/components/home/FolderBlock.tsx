import React, { useRef, useState } from "react";
import styled from "styled-components";
import { COLOR } from "../../utils/color";

interface FolderProps {
  user: string;
  title?: string[];
  details?: string[][];
}

const FolderBlock: React.FC<FolderProps> = ({
  user,
  title = [],
  details = [[]],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (containerRef.current) {
      setIsDown(true);
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
      containerRef.current.classList.add("active");
    }
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    if (containerRef.current) {
      containerRef.current.classList.remove("active");
    }
  };

  const handleMouseUp = () => {
    setIsDown(false);
    if (containerRef.current) {
      containerRef.current.classList.remove("active");
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    if (containerRef.current) {
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - startX) * 2; // 스크롤 속도 조절
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const colors = [COLOR.beige, COLOR.yellow, COLOR.green, COLOR.blue];
  const totalBlocks = title.length;

  return (
    <OuterContainer>
      <Title>{user}님의 저장된 리스트</Title>
      <HorizontalScrollContainer
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {title.length > 0 ? (
          title.map((item, index) => (
            <Block
              key={index}
              position={index}
              totalBlocks={totalBlocks}
              color={colors[index % colors.length]}
            >
              <TitleText>{title[index]}</TitleText>
              <DetailList>
                {details[index]?.map((detail, detailIndex) => (
                  <DetailItem key={detailIndex}>{detail}</DetailItem>
                ))}
              </DetailList>
            </Block>
          ))
        ) : (
          <EmptyBlock>폴더를 생성해보세요!</EmptyBlock>
        )}
      </HorizontalScrollContainer>
    </OuterContainer>
  );
};

export default FolderBlock;

interface BlockProps {
  position: number;
  totalBlocks: number;
  color: string;
}

const OuterContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  flex-grow: 1.5;
  font-size: 19px;
  font-weight: bold;
  align-self: flex-start;
  margin-bottom: 10px;
`;

const HorizontalScrollContainer = styled.div`
  height: 100%;
  width: calc(100% + 10px);
  padding: 10px;
  display: flex;
  overflow-x: hidden;
  scroll-snap-type: x mandatory;
  gap: 18px;
  touch-action: pan-x;
  align-items: center;

  &.active {
    cursor: grabbing;
    cursor: -webkit-grabbing;
  }
`;

const Block = styled.div<BlockProps>`
  height: 100%;
  flex: 0 0 70%;
  background-color: ${(props) => props.color};
  border-radius: 16px;
  padding: 18px;
  box-sizing: border-box;
  scroll-snap-align: center;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
`;

const TitleText = styled.div`
  margin: 0;
  font-size: 15px;
  font-weight: bold;
  color: black;
  margin-bottom: 10px;
`;

const DetailList = styled.ul`
  flex-grow: 1;
  list-style: none;
  padding: 0;
  margin: 0;
  color: #888888;
`;

const DetailItem = styled.li`
  font-size: 14px;
  margin: 5px 0;
`;

const EmptyBlock = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${COLOR.beige};
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  color: black;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
`;
