// HomePage.tsx
import styled from "styled-components";
import { COLOR } from "../utils/color";
import { useState } from "react";
import exampleImage from "../assets/images/KakaoTalk_Photo_2024-08-07-20-33-27.png";
import BentoGrid from "../components/BentoGrid";
import CommunityBlock from "../components/home/CommunitySwiperBlock";
import ImageBlock from "../components/home/ImageBlock";
import CourseBlock from "../components/home/CourseBlock";
import { ReactComponent as SearchIcon } from "../assets/icons/bell-svgrepo-com.svg";
import GoodeListBlock from "../components/home/GoodeListBlock";
import FolderBlock from "../components/home/FolderBlock";
import RandomBlock from "../components/home/RandomBlock";
import AdBlock from "../components/home/AdBlock";
import NotificationSheet from "../components/home/NotificationSheet";
import { useNavigate } from "react-router-dom";
import CommunitySwiperBlock from "../components/home/CommunitySwiperBlock";

// 커뮤니티 게시글에 대한 임시 데이터입니다.
const communityData = {
  goode: "굳이? 성심당 가서 망고시루 먹기",
  image: exampleImage,
};

// 관광코스에 대한 임시 데이터입니다.
const courseData = {
  details: [
    "한화 이글스 경기 보기 ^^",
    "소제동 카페거리에서 커피 마시기",
    "대전역에서 전역 사진 찍기",
  ],
};

export default function HomePage() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const navigate = useNavigate();

  const items = [
    {
      id: 1,
      width: 10,
      height: 5,
      component: <CommunitySwiperBlock />,
    },
    {
      id: 2,
      width: 4,
      height: 7,
      component: (
        <ImageBlock
          goode={communityData.goode}
          image={communityData.image}
          onClick={() => {
            /* 비어있는 핸들러 */
          }}
        />
      ),
    },
    {
      id: 3,
      width: 6,
      height: 3,
      component: (
        <GoodeListBlock
          onClick={() => {
            /* 비어있는 핸들러 */
          }}
        />
      ),
    },
    {
      id: 4,
      width: 6,
      height: 4,
      component: (
        <CourseBlock
          details={courseData.details}
          onClick={() => {
            /* 비어있는 핸들러 */
          }}
        />
      ),
    },
    {
      id: 5,
      width: 10,
      height: 6,
      component: <FolderBlock />,
    },
    {
      id: 6,
      width: 10,
      height: 2,
      component: <RandomBlock onClick={() => navigate("/random-goode")} />,
    },
    {
      id: 7,
      width: 10,
      height: 5,
      component: (
        <AdBlock
          onClick={() => {
            /* 비어있는 핸들러 */
          }}
        />
      ),
    },
  ];

  return (
    <HomeContainer>
      <StyledHeader>홈</StyledHeader>
      <Container>
        <HeaderContainer>
          <Text>커뮤니티 Best!</Text>
          <IconButton onClick={() => setIsNotificationOpen(true)}>
            <SearchIcon />
          </IconButton>
        </HeaderContainer>
        <BentoGrid items={items} />
      </Container>
      <NotificationSheet
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  width: 100%;
`;

const StyledHeader = styled.header`
  width: 100%;
  height: 72px;
  font-size: 28px;
  font-weight: bold;
  display: flex;
  align-items: center;
  background-color: ${COLOR.blue};
  padding: 0 24px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
`;

const Container = styled.div`
  padding: 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`;

const Text = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    opacity: 0.7;
  }
`;
