import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Sheet } from "react-modal-sheet";
import { get_item_course } from "../../services/course";
import { CourseDetailResponse } from "../../types/course";
import usePostsStore from "../../store/usePostsStore";
import { local_government } from "../../data/districts";
import { City, Filters } from "../../types/common";

interface CourseSheetProps {
  courseId: string | null;
}

export default function CourseSheet({ courseId }: CourseSheetProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [course, setCourse] = useState<CourseDetailResponse | null>(null);
  const { setSearchQuery, setFilters } = usePostsStore();

  // courseId가 있으면 시트 열기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get_item_course(Number(courseId));
        setCourse(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    if (courseId) {
      setIsOpen(true);
      fetchData();
    } else {
      setIsOpen(false);
    }
  }, [courseId]);

  // 시트를 닫을 때 courseId를 쿼리에서 제거
  const handleClose = () => {
    const params = new URLSearchParams(location.search);
    params.delete("courseId");
    setIsOpen(false);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true }); // 쿼리 업데이트
  };

  // goode.localGovernmentName으로 City 객체 찾기
  const findCityByLocalname = (
    localGovernmentName: string
  ): City | undefined => {
    for (const region of local_government) {
      const city = region.districts.find(
        (district) => district.name === localGovernmentName
      );
      if (city) {
        return city;
      }
    }
    return undefined;
  };

  // 커뮤니티로 이동
  const handleCommunityClick = async () => {
    if (course) {
      setIsOpen(false);
      setSearchQuery(course.goodeTitle);

      const city = findCityByLocalname(course.goodeLocalGovernmentName);
      if (city) {
        const filters: Filters = {
          theme: [],
          metropolitanGovernments: [],
          localGovernments: [city],
        };
        setFilters(filters);
      } else {
        console.error("City not found for", course.goodeLocalGovernmentName);
      }
      navigate("/community", { replace: true });
    }
  };

  return (
    <StyledSheet isOpen={isOpen} onClose={handleClose}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          {course && (
            <ContentWrapper>
              <h3 className="title">{course.goodeTitle}</h3>
              <h3 className="metropolitan-government">
                {course.goodeMetropolitanGovernmentName}
              </h3>
              <ItemsWrapper>
                {course.itemCourses.map((item) => (
                  <ItemWrapper key={item.itemId}>
                    <p className="item-title">• {item.itemTitle}</p>
                    <p className="item-address">{item.itemAddress}</p>
                  </ItemWrapper>
                ))}
              </ItemsWrapper>
              <ButtonsWrapper>
                <button>저장하기</button>
                <button onClick={handleCommunityClick}>커뮤니티</button>
              </ButtonsWrapper>
            </ContentWrapper>
          )}
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={handleClose} />
    </StyledSheet>
  );
}

const StyledSheet = styled(Sheet)`
  width: 100%;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
`;

const ContentWrapper = styled.div`
  overflow: auto;
  height: 100%;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  h3 {
    margin: 0;
  }
  .title {
    font-size: 22px;
  }
  .metropolitan-government {
    color: #b9b9b9;
    font-weight: normal;
    font-size: 18px;
  }
`;

const ItemsWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  p {
    margin: 0;
  }
  .item-title {
    font-size: 20px;
  }
  .item-address {
    color: #b9b9b9;
    margin-left: 14px;
  }
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  gap: 20px;
  button {
    flex: 1;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
    border-radius: 6px;
    box-shadow: 0px 4px 4px 0px #00000026;
    background-color: #e4f1e1;
    border: none;
  }
`;
