import styled from "styled-components";
import { COLOR } from "../utils/color";
import { useEffect, useState } from "react";
import BentoGrid from "../components/BentoGrid";
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
import { get_items_recommend } from "../services/item";
import { ItemRecommendResponse } from "../types/item";

export default function HomePage() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [recommendData, setRecommendData] =
    useState<ItemRecommendResponse | null>(null);
  const [error, setError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // 로그인 여부 확인
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const fetchRecommendItems = async () => {
      try {
        const data = await get_items_recommend();
        setRecommendData(data.data);
        setError(false);
      } catch (error) {
        setRecommendData(null);
        setError(true);
        console.error("Failed to fetch recommendation data", error);
      }
    };

    fetchRecommendItems();
  }, []);

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
          goode={
            error
              ? "해당 항목을 불러오는 데 실패했습니다."
              : recommendData?.title || "Loading..."
          }
          image={recommendData?.imageUrl}
          onClick={() => {
            if (!error) {
              navigate(`?itemId=${recommendData?.itemId}`);
            }
          }}
        />
      ),
    },
    {
      id: 3,
      width: 6,
      height: 3,
      component: <GoodeListBlock />,
    },
    {
      id: 4,
      width: 6,
      height: 4,
      component: (
        <CourseBlock
          details={
            error
              ? ["해당 항목을 불러오는 데 실패했습니다."]
              : recommendData?.courses
                  ?.slice(0, 3)
                  .map((course) => course.itemTitle) || []
          }
          onClick={() => {
            if (!error) {
              navigate(
                `?itemId=${recommendData?.itemId}&courseId=${recommendData?.itemId}`
              );
            }
          }}
        />
      ),
    },
    {
      id: 5,
      width: 10,
      height: 6,
      component: <FolderBlock isLoggedIn={isLoggedIn} />,
    },
    {
      id: 6,
      width: 10,
      height: 2,
      component: <RandomBlock />,
    },
    {
      id: 7,
      width: 10,
      height: 5,
      component: <AdBlock />,
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
      <iframe
        src="/hotel-widget.html"
        title="Hotel Widget"
        width="100%"
        height="320px"
        style={{ border: "none", marginTop: "20px" }}
      />
      <NotificationSheet
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        isLoggedIn={isLoggedIn}
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
