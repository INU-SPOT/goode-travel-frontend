import React from "react";
import styled from "styled-components";
import { COLOR } from "../../utils/color";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

interface FolderProps {
  user: string;
  title?: string[];
  details?: string[][];
  onClick?: () => void;
}

export default function FolderBlock({
  user,
  title = [],
  details = [[]],
  onClick,
}: FolderProps) {
  const colors = [COLOR.beige, COLOR.yellow, COLOR.green, COLOR.blue];
  const totalblocks = title.length;

  return (
    <OuterContainer>
      <Title>{user}님의 저장된 리스트</Title>
      {title.length > 0 ? (
        <StyledSwiper
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          modules={[Pagination]}
          centeredSlides={true}
          grabCursor={true}
          spaceBetween={20}
        >
          {title.map((item, index) => (
            <StyledSlide
              key={index}
              position={index}
              totalblocks={totalblocks}
              color={colors[index % colors.length]}
            >
              <TitleText>{title[index]}</TitleText>
              <DetailList>
                {details[index]?.map((detail, detailIndex) => (
                  <DetailItem key={detailIndex}>{detail}</DetailItem>
                ))}
              </DetailList>
            </StyledSlide>
          ))}
        </StyledSwiper>
      ) : (
        <EmptyBlock>폴더를 생성해보세요!</EmptyBlock>
      )}
    </OuterContainer>
  );
}

interface BlockProps {
  position: number;
  totalblocks: number;
  color: string;
}

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  padding: 0 2px 25px 2px;
`;

const StyledSlide = styled(SwiperSlide)<BlockProps>`
  flex: 0 0 100%;
  background-color: ${(props) => props.color};
  border-radius: 16px;
  padding: 18px;
  box-sizing: border-box;
  scroll-snap-align: center;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
`;

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
