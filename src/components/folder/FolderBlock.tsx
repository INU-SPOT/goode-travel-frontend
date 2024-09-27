import { useState, useEffect } from "react";
import styled from "styled-components";
import { FolderListResponse } from "../../types/folder";
import { get_folders_folderid } from "../../services/folder";
import { FolderDetailResponse } from "../../types/folder";
import { useNavigate } from "react-router-dom";

interface FolderBlockProps {
  folder: FolderListResponse;
  onDelete: (folderId: number) => void;
}

export default function FolderBlock({ folder, onDelete }: FolderBlockProps) {
  const [completionRate, setCompletionRate] = useState<number>(0);
  const navigate = useNavigate();
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchCompletionRate = async () => {
      try {
        const folderDetail: FolderDetailResponse = await get_folders_folderid(
          folder.folderId
        );
        const planItems = folderDetail.itemFolders.filter(
          (item) => item.itemType === "PLAN"
        );
        const completedPlans = planItems.filter(
          (item) => item.isFinished
        ).length;
        const completionRate =
          planItems.length > 0 ? (completedPlans / planItems.length) * 100 : 0;
        setCompletionRate(parseFloat(completionRate.toFixed(1))); // 소수점 한자리까지 표시
      } catch (error) {
        console.error(`Error fetching folder details: ${error}`);
      }
    };

    fetchCompletionRate();
  }, [folder.folderId]);

  const handleNavigate = () => {
    if (!longPressTriggered) {
      navigate(`/save/${folder.folderId}`);
    }
    setLongPressTriggered(false);
  };

  const startLongPress = () => {
    setPressTimer(
      setTimeout(() => {
        setLongPressTriggered(true);
        if (window.confirm(`${folder.title} 폴더를 삭제하시겠습니까?`)) {
          onDelete(folder.folderId);
        }
      }, 800)
    );
  };

  const cancelLongPress = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
    }
    setLongPressTriggered(false);
  };

  return (
    <BlockContainer
      onClick={handleNavigate}
      onTouchStart={startLongPress} // 터치 시작
      onTouchEnd={cancelLongPress} // 터치 종료
      onMouseDown={startLongPress} // 마우스 클릭 시작 (롱프레스 시작)
      onMouseUp={cancelLongPress} // 마우스 클릭 종료 (롱프레스 취소)
      onMouseLeave={cancelLongPress} // 마우스 영역 벗어날 때도 취소
    >
      <FolderImageContainer image={folder.image}>
        {!folder.image && <Placeholder />}
      </FolderImageContainer>
      <Footer>
        <FolderTitle>{folder.title}</FolderTitle>
        <CompletionRate>
          {completionRate !== undefined ? `${completionRate}%` : "Loading..."}
        </CompletionRate>
      </Footer>
    </BlockContainer>
  );
}

// 스타일 정의
const BlockContainer = styled.div`
  width: 100%;
  padding: 0;
  border-radius: 13px;
  text-align: left;
  cursor: pointer;
  position: relative;
`;

const FolderImageContainer = styled.div<{ image: string | null }>`
  width: 100%;
  padding-top: 100%;
  background-color: ${({ image }) => (image ? "transparent" : "#25292E")};
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  border-radius: 13px;
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: #25292e;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 5px;
`;

const FolderTitle = styled.h3`
  font-size: 16px;
  margin: 0;
  color: #333;
  flex-grow: 1;
`;

const CompletionRate = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0;
  text-align: right;
`;
