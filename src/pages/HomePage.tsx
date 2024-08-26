import styled from "styled-components";
import { COLOR } from "../utils/color";

interface StyledCommunityProps {
  title: string;
  details: string[];
  recommendations: number;
}

const communityData = {
  title: "대전 투어",
  details: [
    "굳이? 성심당 가서 망고시루 먹기",
    "남선 공원에서 산책하기",
    "대동하늘공원에서 일몰 보기",
    "KAIST 거위 구경하기",
  ],
  recommendations: 123,
};

export default function HomePage() {
  return (
    <>
      <StyledHeader>홈</StyledHeader>
      <Container>
        <Text>커뮤니티 Best!</Text>
        <StyledCommunity
          title={communityData.title}
          details={communityData.details}
          recommendations={communityData.recommendations}
        />
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
  background-color: ${COLOR.green};
  padding-left: 24px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
`;

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  gap: 18px;
`;

const Text = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-left: 28px;
  margin-top: 18px;
`;

const StyledCommunity = ({
  title,
  details,
  recommendations,
}: StyledCommunityProps) => {
  const CommunityWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 28px;
    background-color: ${COLOR.green};
    justify-content: center;
    border-radius: 16px;
    padding: 18px;
    box-sizing: border-box;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
  `;

  const Title = styled.h2`
    font-size: 19px;
    font-weight: bold;
    margin-bottom: 12px;
    margin-top: 0;
    text-align: center;
  `;

  const DetailList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    margin-bottom: 9px;
  `;

  const DetailItem = styled.li`
    font-size: 14px;
    margin-bottom: 9px;
  `;

  const Recommendations = styled.div`
    font-size: 12px;
    text-align: right;
  `;

  return (
    <CommunityWrapper>
      <Title>{title}</Title>
      <DetailList>
        {details.map((detail, index) => (
          <DetailItem key={index}>{detail}</DetailItem>
        ))}
      </DetailList>
      <Recommendations>{recommendations}개</Recommendations>
    </CommunityWrapper>
  );
};
