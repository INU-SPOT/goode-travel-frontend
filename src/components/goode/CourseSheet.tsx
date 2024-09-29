import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Sheet } from "react-modal-sheet";
import { get_item_course } from "../../services/course";
import { CourseDetailResponse } from "../../types/course";
import usePostsStore from "../../store/usePostsStore";
import { local_government } from "../../data/districts";
import { City, Filters } from "../../types/common";
import FolderSelectSheet from "./FolderSelectSheet";

interface CourseSheetProps {
  courseId: string | null;
}

export default function CourseSheet({ courseId }: CourseSheetProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [course, setCourse] = useState<CourseDetailResponse | null>(null);
  const { setSearchQuery, setFilters } = usePostsStore();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);
  const [isFolderSheetOpen, setIsFolderSheetOpen] = useState(false);

  // courseId가 있으면 시트 열기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get_item_course(Number(courseId));
        setCourse(response.data);
      } catch (error) {
        console.error("Failed to fetch course:", error);
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
    setIsEditing(false);
    setIsOpen(false);
    const newURL = `${location.pathname}?${params.toString()}`;
    navigate(newURL); // 쿼리 업데이트
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
      navigate("/community");
    }
  };

  // '저장하기' 버튼 클릭
  const handleSaveClick = () => {
    setIsEditing(true);
    setSelectedItemIds([]);
  };

  // 체크박스 변경 핸들러
  const handleCheckboxChange = (itemId: number) => {
    setSelectedItemIds((prevSelected) => {
      if (prevSelected.includes(itemId)) {
        return prevSelected.filter((id) => id !== itemId); // 이미 선택된 경우 해제
      } else {
        return [...prevSelected, itemId]; // 선택 추가
      }
    });
  };

  // '폴더 선택' 버튼 클릭
  const handleFolderSelectClick = () => {
    if (selectedItemIds.length > 0) {
      setIsFolderSheetOpen(true);
    } else {
      alert("아이템을 선택해주세요.");
    }
  };

  return (
    <>
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
                      <div>
                        <p className="item-title">• {item.itemTitle}</p>
                        <p className="item-address">{item.itemAddress}</p>
                      </div>
                      {isEditing && (
                        <StyledCheckbox
                          type="checkbox"
                          checked={selectedItemIds.includes(item.itemId)}
                          onChange={() => handleCheckboxChange(item.itemId)}
                        />
                      )}
                    </ItemWrapper>
                  ))}
                </ItemsWrapper>
                {!isEditing ? (
                  <ButtonsWrapper>
                    <button onClick={handleSaveClick}>저장하기</button>
                    <button onClick={handleCommunityClick}>커뮤니티</button>
                  </ButtonsWrapper>
                ) : (
                  <>
                    <ButtonsWrapper>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="cancel"
                      >
                        취소
                      </button>
                      <button onClick={handleFolderSelectClick}>
                        폴더 선택
                      </button>
                    </ButtonsWrapper>
                  </>
                )}
              </ContentWrapper>
            )}
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={handleClose} />
      </StyledSheet>
      {isFolderSheetOpen && (
        <FolderSelectSheet
          isOpen={isFolderSheetOpen}
          itemIds={selectedItemIds}
          onClose={() => {
            setIsFolderSheetOpen(false);
            setIsEditing(false);
          }}
        />
      )}
    </>
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
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  div {
    flex: 1;
    max-width: calc(100% - 40px);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

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

const StyledCheckbox = styled.input`
  width: 28px;
  height: 28px;
  background-color: #f4f4f4;
  border: 1px solid #a9a9a9;
  border-radius: 9px;
  appearance: none;

  &:checked::after {
    content: "✓";
    color: #4f4f4f;
    font-size: 27px;
    display: flex;
    justify-content: center;
    align-items: center;
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
    cursor: pointer;
  }
  .cancel {
    background-color: #ff0000;
    color: white;
  }
`;
