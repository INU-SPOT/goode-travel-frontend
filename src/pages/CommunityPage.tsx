import styled from "styled-components";
import CommunityHeader from "../components/CommunityHeader";
import PostCard from "../components/PostCard";

export default function CommunityPage() {
  return (
    <CommunityContainer>
      <CommunityHeader />
      <PostList>
        {/* 예시로 몇 개의 PostCard를 추가 */}
        <PostCard
          title="대전 투어"
          subTitles={[
            "굳이? 성심당 가서 망고시루 먹기",
            "남선공원에서 산책하기",
            "대동하늘공원에서 일몰 보기",
            "KAIST 거위 구경하기",
          ]}
          likes={88848}
          comments={1557}
          author="ㅈㅎㄱ"
          thumbnail=""
        />
        <PostCard
          title="노잼 도시 탈출기"
          subTitles={[
            "굳이? 성심당 가서 망고시루 먹기",
            "오월드 가서 동물원 구경하기",
            "뿌리공원에서 나의 성씨 비석 찾기",
            "엑스포 과학 시민공원에서 자전거 타기",
            "다섯번째 계획도 넣어보기",
          ]}
          likes={84888}
          comments={1602}
          author="ㄱㅁㄱ"
          thumbnail=""
        />
        <PostCard
          title="테스트"
          subTitles={["굳이? subTitle이 적다면?", "두개 까지만 넣어보자"]}
          likes={12}
          comments={34}
          author="ㅇㅁㄱ"
          thumbnail=""
        />
      </PostList>
    </CommunityContainer>
  );
}

const CommunityContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px; /* 상단 여백 설정 */
`;
