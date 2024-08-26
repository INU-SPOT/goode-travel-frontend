import styled from "styled-components";
import { COLOR } from "../utils/color";

interface StyledCommunityProps {
  title: string;
  details: string[]; // 4가지 계획
  recommendations: number; // 추천 수
  children?: React.ReactNode;
}

export default function HomePage() {
  return (
    <>
      <StyledHeader>홈</StyledHeader>
      <Container>
        <Text>커뮤니티 Best!</Text>
        <StyledCommunity
          title="대전 투어"
          details={["상세 항목 1", "상세 항목 2", "상세 항목 3", "상세 항목 4"]}
          recommendations={123}
        ></StyledCommunity>
      </Container>
    </>
  );
}

const StyledHeader = styled.header`
  width: 100%;
  height: 72px;
  background-color: ${COLOR.green};
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
    padding: 16px;
    box-sizing: border-box;
  `;

  const Title = styled.h2`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 12px;
  `;

  const DetailList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    margin-bottom: 12px;
  `;

  const DetailItem = styled.li`
    font-size: 16px;
    margin-bottom: 8px;
  `;

  const Recommendations = styled.div`
    font-size: 16px;
    font-weight: bold;
  `;

  return (
    <CommunityWrapper>
      <Title>{title}</Title>
      <DetailList>
        {details.map((detail, index) => (
          <DetailItem key={index}>{detail}</DetailItem>
        ))}
      </DetailList>
      <Recommendations>추천 수: {recommendations}</Recommendations>
    </CommunityWrapper>
  );
};
