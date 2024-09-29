import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ShareIcon from "../../assets/icons/share-icon.svg";
import FolderPlusIcon from "../../assets/icons/folder-plus-icon.svg";
import { Sheet } from "react-modal-sheet";
import { get_items_itemId } from "../../services/item";
import { ItemResponse } from "../../types/item";
import usePostsStore from "../../store/usePostsStore";
import { local_government } from "../../data/districts";
import { City, Filters } from "../../types/common";
import FolderSelectSheet from "./FolderSelectSheet";

interface GoodeSheetProps {
  itemId: string | null;
}

export default function GoodeSheet({ itemId }: GoodeSheetProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [goode, setGoode] = useState<ItemResponse | null>(null);
  const { setSearchQuery, setFilters } = usePostsStore();
  const [isFolderSheetOpen, setIsFolderSheetOpen] = useState(false);

  // itemId가 있으면 시트 열기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get_items_itemId(Number(itemId));
        setGoode(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    if (itemId) {
      setIsOpen(true);
      fetchData();
    } else {
      setIsOpen(false);
    }
  }, [itemId]);

  // 시트를 닫을 때 itemId를 쿼리에서 제거
  const handleClose = () => {
    const params = new URLSearchParams(location.search);
    params.delete("itemId");
    setIsOpen(false);
    const newURL = `${location.pathname}?${params.toString()}`;
    navigate(newURL); // 쿼리 업데이트
  };

  // 공유하기
  const handleShareClick = async () => {
    if (navigator.share && goode) {
      try {
        await navigator.share({
          title: "⭐️ 굳이? 여행가자! ⭐️",
          text: goode.title,
          url: window.location.href,
        });
        console.log("Successfully shared!");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Sharing is not supported in this browser.");
    }
  };

  // 폴더에 추가
  const handleFolderClick = () => {
    setIsFolderSheetOpen(true);
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

  // 코스 보기
  const handleCourseClick = async () => {
    const params = new URLSearchParams(location.search);
    params.set("courseId", itemId || "");
    const newUrl = `${location.pathname}?${params.toString()}`;
    navigate(newUrl);
  };

  // 커뮤니티로 이동
  const handleCommunityClick = async () => {
    if (goode) {
      setIsOpen(false);
      setSearchQuery(goode.title);

      const city = findCityByLocalname(goode.localGovernmentName);
      if (city) {
        const filters: Filters = {
          theme: [],
          metropolitanGovernments: [],
          localGovernments: [city],
        };
        setFilters(filters);
      } else {
        console.error("City not found for", goode.localGovernmentName);
      }
      navigate("/community");
    }
  };

  return (
    <>
      <StyledSheet isOpen={isOpen} onClose={handleClose}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            {goode && (
              <ContentWrapper>
                <TitleWrapper>
                  <h2>{goode.title}</h2>
                  <img
                    src={ShareIcon}
                    onClick={handleShareClick}
                    alt="ShareIcon"
                  />
                </TitleWrapper>
                <ImageWeatherWrapper>
                  <img
                    src={
                      goode.imageUrl
                        ? goode.imageUrl
                        : `${process.env.REACT_APP_IMAGE_URL}/frog.jpeg` // TODO: imageURL이 공백일 때, 로고 보이도록 하기
                    }
                    alt={goode.title}
                  />
                  <span className="weather"></span>
                </ImageWeatherWrapper>
                <FolderAddressWrapper>
                  <span className="folder" onClick={handleFolderClick}>
                    <img src={FolderPlusIcon} alt="폴더에 추가" />
                  </span>
                  <span className="address">{goode.address}</span>
                </FolderAddressWrapper>
                <Description>{goode.description}</Description>
                <h3>주변 여행지가 궁금하다면?</h3>
                <CourseCommunityWrapper>
                  <span className="course" onClick={handleCourseClick}>
                    관광코스
                  </span>
                  <span className="community" onClick={handleCommunityClick}>
                    커뮤니티
                  </span>
                </CourseCommunityWrapper>
              </ContentWrapper>
            )}
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={handleClose} />
      </StyledSheet>
      {isFolderSheetOpen && itemId && (
        <FolderSelectSheet
          isOpen={isFolderSheetOpen}
          itemIds={[Number(itemId)]}
          onClose={() => setIsFolderSheetOpen(false)}
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
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  span {
    border-radius: 6px;
    box-shadow: 0px 4px 4px 0px #00000026;
  }
  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  h2 {
    flex: 1;
    margin: 0;
    font-size: 20px;
    font-weight: bold;
  }

  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;

const ImageWeatherWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  img {
    width: 62%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 6px;
    box-shadow: 0px 4px 4px 0px #00000026;
  }

  .weather {
    width: 32%;
    height: auto;
    background: linear-gradient(
      180deg,
      #e4f3fc 0%,
      #2dafff 100%
    ); // TODO: 날씨에 맞게 표시
  }

  @media (max-width: 480px) {
    img {
      width: calc((100vw - 48px) * 0.62);
    }
    .weather {
      width: calc((100vw - 48px) * 0.32);
    }
  }
`;

const FolderAddressWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  .folder {
    width: 22%;
    aspect-ratio: 1 / 1;
    background-color: #fdffd0;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 50%;
    }
  }

  .address {
    width: 72%;
    height: auto;
    background-color: #e4f1e1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
    padding: 0 12px;
  }

  @media (max-width: 480px) {
    img {
      width: calc((100vw - 48px) * 0.62);
    }
    .weather {
      width: calc((100vw - 48px) * 0.32);
    }
  }
`;

const Description = styled.span`
  min-height: 180px;
  padding: 16px;
  background-color: #fff8ed;
  font-size: 18px;
`;

const CourseCommunityWrapper = styled.div`
  display: flex;
  gap: 20px;
  span {
    flex: 1;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
  }
  .course {
    background-color: #abe5e3;
  }
  .community {
    background-color: #e4f1e1;
  }
`;
