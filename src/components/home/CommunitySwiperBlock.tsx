import { useEffect, useState } from "react";
import styled from "styled-components";
import { COLOR } from "../../utils/color";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import { get_post_top_visit, get_post_top_like } from "../../services/home";
import { TopPostResponse } from "../../types/post";

export default function CommunitySwiperBlock() {
  const [topVisitPost, setTopVisitPost] = useState<TopPostResponse | null>(
    null
  );
  const [topLikePost, setTopLikePost] = useState<TopPostResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const visitResponse = await get_post_top_visit();
        const likeResponse = await get_post_top_like();
        setTopVisitPost(visitResponse); // API 응답 구조에 따라 수정
        setTopLikePost(likeResponse); // API 응답 구조에 따라 수정
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  if (loading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  return (
    <SwiperContainer>
      <StyledSwiper
        pagination={{ dynamicBullets: true, clickable: true }}
        modules={[Pagination]}
        centeredSlides={true}
        grabCursor={true}
        spaceBetween={20}
      >
        <SwiperSlide>
          {topVisitPost ? (
            <CommunityBlock
              post={topVisitPost}
              onClick={handleClick}
              isVisit={true}
            />
          ) : (
            <NoPostsMessage>현재 게시물이 없습니다.</NoPostsMessage>
          )}
        </SwiperSlide>
        <SwiperSlide>
          {topLikePost ? (
            <CommunityBlock
              post={topLikePost}
              onClick={handleClick}
              isVisit={false}
            />
          ) : (
            <NoPostsMessage>현재 게시물이 없습니다.</NoPostsMessage>
          )}
        </SwiperSlide>
      </StyledSwiper>
    </SwiperContainer>
  );
}

interface CommunityBlockProps {
  post: TopPostResponse;
  onClick: (postId: number) => void;
  isVisit: boolean;
}

// TODO: 게시글 제목 길이 조정 -> ... 처리
// 조회수가 블록 밖으로 밀려남... 80% 내에서 나가지 않도록 조정하자

function CommunityBlock({ post, onClick, isVisit }: CommunityBlockProps) {
  const { postId, title, items, topNum } = post;
  const goodeItem = items.find((item) => item.itemType === "GOODE");
  const planItems = items
    .filter((item) => item.itemType === "PLAN")
    .slice(0, 2);

  const shortenedTitle = title.length > 17 ? `${title.slice(0, 17)}...` : title;

  return (
    <BlockWrapper onClick={() => onClick(postId)} isVisit={isVisit}>
      <Title>{shortenedTitle}</Title>
      {goodeItem && <Goode>{goodeItem.itemTitle}</Goode>}
      <DetailList>
        {planItems.map((detail, index) => (
          <DetailItem key={index}>{detail.itemTitle}</DetailItem>
        ))}
      </DetailList>
      <Recommendations>
        {isVisit ? `조회수 ${topNum}` : `좋아요 ${topNum}`}
      </Recommendations>
    </BlockWrapper>
  );
}

const SwiperContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
`;

interface BlockWrapperProps {
  isVisit: boolean;
}

const BlockWrapper = styled.div<BlockWrapperProps>`
  height: 80%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.isVisit ? COLOR.green : COLOR.yellow)};
  border-radius: 13px;
  padding: 18px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  margin-bottom: 15px;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 19px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

const Goode = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const DetailList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  color: #888888;
`;

const DetailItem = styled.li`
  font-size: 14px;
  margin: 5px 0;
`;

const Recommendations = styled.div`
  font-size: 12px;
  text-align: right;
  margin-top: 10px;
  align-self: flex-end;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 18px;
  padding: 20px;
`;

const NoPostsMessage = styled.div`
  text-align: center;
  font-size: 16px;
  color: #888;
`;
