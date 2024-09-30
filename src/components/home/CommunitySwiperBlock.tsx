import styled from "styled-components";
import { COLOR } from "../../utils/color";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useLocation, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import { get_post_top_visit, get_post_top_like } from "../../services/home";
import { TopPostResponse } from "../../types/post";
import { useEffect, useState } from "react";

export default function CommunitySwiperBlock() {
  const [topVisitPost, setTopVisitPost] = useState<TopPostResponse | null>(
    null
  );
  const [topLikePost, setTopLikePost] = useState<TopPostResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const visitResponse = await get_post_top_visit();
        const likeResponse = await get_post_top_like();
        setTopVisitPost(visitResponse);
        setTopLikePost(likeResponse);
        setError(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError(true); // 에러 상태 설정
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleNavigateWithQuery = (postId: number) => {
    const params = new URLSearchParams(location.search);
    params.set("postId", String(postId));
    const newUrl = `${location.pathname}?${params.toString()}`;
    navigate(newUrl);
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
          <CommunityBlock
            post={topVisitPost}
            onClick={handleNavigateWithQuery}
            isVisit={true}
            error={error}
          />
        </SwiperSlide>
        <SwiperSlide>
          <CommunityBlock
            post={topLikePost}
            onClick={handleNavigateWithQuery}
            isVisit={false}
            error={error}
          />
        </SwiperSlide>
      </StyledSwiper>
    </SwiperContainer>
  );
}

interface CommunityBlockProps {
  post: TopPostResponse | null;
  onClick: (postId: number) => void;
  isVisit: boolean;
  error: boolean;
}

function CommunityBlock({
  post,
  onClick,
  isVisit,
  error,
}: CommunityBlockProps) {
  if (error || !post) {
    return (
      <BlockWrapper isVisit={isVisit}>
        <Title>해당 항목을 불러오는 데 실패했습니다.</Title>
      </BlockWrapper>
    );
  }

  const { postId, title, items, topNum } = post;
  const goodeItem = items.find((item) => item.itemType === "GOODE");
  const planItems = items
    .filter((item) => item.itemType === "PLAN")
    .slice(0, 2);

  return (
    <BlockWrapper onClick={() => onClick(postId)} isVisit={isVisit}>
      <Title>{title.length > 16 ? `${title.slice(0, 16)}...` : title}</Title>
      {goodeItem && <Goode>{goodeItem.itemTitle}</Goode>}
      <DetailList>
        {planItems.map((detail, index) => (
          <DetailItem key={index}>
            {detail.itemTitle.length > 24
              ? `${detail.itemTitle.slice(0, 24)}...`
              : detail.itemTitle}
          </DetailItem>
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
  height: 85%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.isVisit ? COLOR.green : COLOR.yellow)};
  border-radius: 13px;
  padding: 18px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  margin-bottom: 15px;
  justify-content: space-between;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 900;
  margin-bottom: 7px;
  text-align: center;
`;

const Goode = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const DetailList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  color: #888888;
`;

const DetailItem = styled.li`
  font-size: 13px;
  margin: 5px 0;
`;

const Recommendations = styled.div`
  position: absolute;
  font-size: 11px;
  text-align: right;
  bottom: 45px;
  align-self: flex-end;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 18px;
  padding: 20px;
`;

