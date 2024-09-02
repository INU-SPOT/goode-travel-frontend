// HomePage.tsx
import styled from "styled-components";
import { COLOR } from "../utils/color";
import exampleImage from "../assets/images/KakaoTalk_Photo_2024-08-07-20-33-27.png";
import BentoGrid from "../components/BentoGrid";
import CommunityBlock from "../components/home/CommunityBlock";
import ImageBlock from "../components/home/ImageBlock";
import { ReactComponent as SearchIcon } from "../assets/icons/bell-svgrepo-com.svg";

const communityData = {
  title: "대전 투어",
  goode: "굳이? 성심당 가서 망고시루 먹기",
  details: [
    "남선 공원에서 산책하기",
    "대동하늘공원에서 일몰 보기",
    "KAIST 거위 구경하기",
  ],
  recommendations: 123,
  image: exampleImage,
};

export default function HomePage() {
  const items = [
    {
      id: 1,
      width: 8,
      height: 2,
      component: (
        <CommunityBlock
          title={communityData.title}
          goode={communityData.goode}
          details={communityData.details}
          recommendations={communityData.recommendations}
        />
      ),
    },
    {
      id: 2,
      width: 3,
      height: 2,
      component: (
        <ImageBlock goode={communityData.goode} image={communityData.image} />
      ),
    },
  ];

  return (
    <>
      <StyledHeader>홈</StyledHeader>
      <Container>
        <HeaderContainer>
          <Text>커뮤니티 Best!</Text>
          <IconButton onClick={() => {}}>
            <SearchIcon />
          </IconButton>
        </HeaderContainer>
        <BentoGrid items={items} />
      </Container>
    </>
  );
}

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
