import { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus-icon.svg";
import { Sheet } from "react-modal-sheet";
import {
  get_folders,
  post_folders,
  post_folders_plans,
} from "../../services/folder";
import { FolderListResponse } from "../../types/folder";
import { ItemFolderCreateRequest } from "../../types/item";
import { useSheetPadding } from "../../hooks/useSheetPadding";

interface FolderSelectSheetProps {
  isOpen: boolean;
  itemIds: number[];
  onClose: () => void;
}

export default function FolderSelectSheet({
  isOpen,
  itemIds,
  onClose,
}: FolderSelectSheetProps) {
  const [folders, setFolders] = useState<FolderListResponse[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  useSheetPadding(isOpen);
  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    setIsLoading(true);
    try {
      const response = await get_folders();
      setFolders(response.data);
    } catch (error) {
      console.error("Failed to fetch folders:", error);
      alert("폴더 목록을 가져오는 데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleFolderClick = (folderId: number) => {
    if (selectedFolderId === folderId) {
      setSelectedFolderId(null); // 선택 해제
    } else {
      setSelectedFolderId(folderId); // 폴더 선택
    }
  };

  const handleAddToFolder = async () => {
    if (selectedFolderId && !isAdding) {
      setIsAdding(true);
      try {
        const itemDataArray: ItemFolderCreateRequest[] = itemIds.map(
          (itemId) => ({
            itemId: itemId,
            emoji: "⭐️",
          })
        );

        await post_folders_plans(itemDataArray, selectedFolderId);

        alert(`굳이/계획 ${itemIds.length}개가 폴더에 추가되었습니다.`);
        onClose();
      } catch (error) {
        console.error("Failed to add item to folder:", error);
        alert("아이템 추가에 실패했습니다.");
      } finally {
        setIsAdding(false);
      }
    }
  };

  const handleCreateFolder = async () => {
    const folderName = prompt("새로운 폴더의 이름을 입력하세요:");
    if (folderName) {
      try {
        await post_folders({ title: folderName });
        await fetchFolders();
      } catch (error) {
        console.error("Failed to create folder:", error);
        alert("폴더 생성에 실패했습니다.");
      }
    }
  };

  return (
    <StyledSheet isOpen={isOpen} onClose={handleClose}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content disableDrag>
          {isLoading ? (
            <LoadingMessage>로딩 중...</LoadingMessage>
          ) : (
            <ContentWrapper>
              <TitleWrapper>
                <div />
                <h3>폴더 선택하기</h3>
                <StyledPlusIcon onClick={handleCreateFolder} />
              </TitleWrapper>
              <FolderList>
                {folders.map((folder) => (
                  <FolderItem
                    $selected={selectedFolderId === folder.folderId}
                    key={folder.folderId}
                    onClick={() => handleFolderClick(folder.folderId)}
                  >
                    <img src={folder.image} alt={folder.title} />
                    <div>{folder.title}</div>
                  </FolderItem>
                ))}
              </FolderList>
              <ButtonsWrapper>
                {selectedFolderId && (
                  <button onClick={handleAddToFolder} disabled={isAdding}>
                    완료
                  </button>
                )}
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
  height: 1000%;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  h3 {
    margin: 0;
    font-size: 22px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  div {
    width: 20px;
  }
`;

const StyledPlusIcon = styled(PlusIcon)`
  width: 20px;
  height: 20px;
`;

const FolderList = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 32px;
`;

const FolderItem = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 20px;
  img {
    width: 80px;
    height: 80px;
    border-radius: 100%;
    opacity: ${({ $selected }) => ($selected ? 1 : 0.5)};
  }
  div {
    font-size: 22px;
    color: ${({ $selected }) => ($selected ? "black" : "#00000080")};
  }
  cursor: pointer;
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

const LoadingMessage = styled.div`
  padding: 16px;
  text-align: center;
  font-size: 18px;
`;
