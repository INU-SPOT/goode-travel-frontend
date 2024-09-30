import styled from "styled-components";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus-icon.svg";
import folderIcon from "../../assets/icons/folder-icon.svg";
import { Sheet } from "react-modal-sheet";
import { useCallback, useEffect, useState } from "react";
import useWriteStore from "../../store/useWriteStore";
import { get_folders, get_folders_folderid } from "../../services/folder";
import { ItemPostCreateUpdateRequest } from "../../types/item";
import { FolderListResponse, FolderDetailResponse } from "../../types/folder";
import CreateItemPost from "./CreateItemPost";

export default function AddItemButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateItemPostOpen, setIsCreateItemPostOpen] = useState(false);
  const { itemPosts, addItemPost, removeItemPost } = useWriteStore();
  const [localItemPosts, setLocalItemPosts] = useState<
    ItemPostCreateUpdateRequest[]
  >([]);
  const [folders, setFolders] = useState<FolderDetailResponse[]>([]);

  // 폴더 목록 및 상세 정보 가져오기
  const fetchFolders = useCallback(async () => {
    try {
      const folderData = await get_folders();

      // 각 폴더의 상세 정보 가져오기
      const folderDetailsPromises = folderData.data.map(
        async (folder: FolderListResponse) => {
          const folderDetailData = await get_folders_folderid(folder.folderId);
          return folderDetailData;
        }
      );

      const foldersDetails = await Promise.all(folderDetailsPromises);

      // 직접 추가한 아이템이 있는 폴더를 포함하여 전체 폴더 설정
      let allFolders: FolderDetailResponse[] = [
        {
          folderId: 0,
          title: "직접 추가한 일정",
          itemFolders: [],
        },
        ...foldersDetails,
      ];

      // useWriteStore의 itemPosts 중 폴더에 없는 itemPosts를 찾기
      const existingItemIds = allFolders.flatMap((folder) =>
        folder.itemFolders.map((item) => item.itemId)
      );

      const missingItemPosts = itemPosts.filter(
        (post) => !existingItemIds.includes(post.itemId)
      );

      // missingItemPosts를 folderId가 0인 폴더의 itemFolders에 추가
      allFolders = allFolders.map((folder) =>
        folder.folderId === 0
          ? {
              ...folder,
              itemFolders: [
                ...folder.itemFolders,
                ...missingItemPosts.map((post) => ({
                  itemFolderId: 0, // 필요에 따라 설정
                  itemId: post.itemId,
                  title: post.itemTitle,
                  image: "", // 필요에 따라 설정
                  address: "", // 필요에 따라 설정
                  localGovernmentId: 0, // 필요에 따라 설정
                  metropolitanGovernmentId: 0, // 필요에 따라 설정
                })),
              ],
            }
          : folder
      );

      setFolders(allFolders);
    } catch (error) {
      console.error("Failed to fetch folders:", error);
    }
  }, [itemPosts]);

  // Sheet가 열릴 때: 전역 상태의 itemPosts를 로컬 상태로 가져오기
  useEffect(() => {
    if (isOpen) {
      setLocalItemPosts([...itemPosts]);
      fetchFolders();
    }
  }, [isOpen, itemPosts, fetchFolders]);

  // 이미 추가된 항목인지 확인
  const isItemAdded = (itemId: number) => {
    return localItemPosts.some((item) => item.itemId === itemId);
  };

  // 로컬 상태에서 아이템을 추가하거나 제거
  const handleToggleItem = (item: {
    itemId: number;
    itemTitle: string;
    content: string;
    images: string[];
  }) => {
    const newItemPost: ItemPostCreateUpdateRequest = {
      itemPostId: null, // 임시로 itemPostId null로 생성
      itemId: item.itemId,
      itemTitle: item.itemTitle,
      content: item.content,
      images: [],
    };

    if (localItemPosts.some((localItem) => localItem.itemId === item.itemId)) {
      setLocalItemPosts(
        localItemPosts.filter((localItem) => localItem.itemId !== item.itemId)
      ); // 이미 있으면 제거
    } else {
      setLocalItemPosts([...localItemPosts, newItemPost]); // 없으면 추가
    }
  };

  // 적용 버튼: 로컬 상태의 ItemPost를 전역 상태로 set
  const handleConfirm = () => {
    // 로컬 상태에 있는 아이템은 추가
    localItemPosts.forEach((item) => {
      if (!itemPosts.some((post) => post.itemId === item.itemId)) {
        addItemPost(item);
      }
    });

    // 전역 상태에 있고, 로컬 상태에 없는 ItemPost는 제거
    itemPosts.forEach((post) => {
      if (
        !localItemPosts.some((localItem) => localItem.itemId === post.itemId)
      ) {
        removeItemPost(post.itemId);
      }
    });

    setIsOpen(false);
  };

  // CreateItemPost에서 아이템을 추가했을 때 호출되는 함수
  const handleAddNewItem = (newItem: ItemPostCreateUpdateRequest) => {
    // 폴더 ID가 0인 폴더에 아이템 추가
    setFolders((prevFolders) =>
      prevFolders.map((folder) =>
        folder.folderId === 0
          ? {
              ...folder,
              itemFolders: [
                ...folder.itemFolders,
                {
                  itemFolderId: 0,
                  itemId: newItem.itemId,
                  title: newItem.itemTitle,
                  image: "", // 필요에 따라 설정
                  address: newItem.content, // 필요에 따라 설정
                  localGovernmentId: 0, // 필요에 따라 설정
                  metropolitanGovernmentId: 0, // 필요에 따라 설정
                },
              ],
            }
          : folder
      )
    );
  };

  return (
    <>
      <StyledAddItemButton onClick={() => setIsOpen(true)}>
        <h3>일정 추가</h3>
        <StyledPlusIcon />
      </StyledAddItemButton>
      <StyledSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <ContentWrapper>
              <StyledAddItemButton
                onClick={() => setIsCreateItemPostOpen(true)}
              >
                <h3>직접 일정 추가</h3>
                <StyledPlusIcon />
              </StyledAddItemButton>
              {folders.map((folder) => (
                <div key={`folder-${folder.folderId}`}>
                  <FolderTitle>
                    <img src={folderIcon} alt={folder.title} />
                    {folder.title}
                  </FolderTitle>
                  <ItemList>
                    {folder.itemFolders.map((item) => {
                      const isAdded = isItemAdded(item.itemId!);
                      return (
                        <StyledItemButton
                          key={item.itemId}
                          onClick={() =>
                            handleToggleItem({
                              itemId: item.itemId!,
                              itemTitle: item.title,
                              content: "",
                              images: [],
                            })
                          }
                          $isAdded={isAdded}
                        >
                          {item.title}
                        </StyledItemButton>
                      );
                    })}
                  </ItemList>
                </div>
              ))}

              {localItemPosts.length > 0 && (
                <ConfirmButton onClick={handleConfirm}>
                  {localItemPosts.length}개 추가!
                </ConfirmButton>
              )}
            </ContentWrapper>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={() => setIsOpen(false)} />
      </StyledSheet>

      {/* CreateItemPost Sheet */}
      <StyledSheet
        isOpen={isCreateItemPostOpen}
        onClose={() => setIsCreateItemPostOpen(false)}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <CreateItemPost
              onAddItem={(newItem) => {
                handleAddNewItem(newItem);
                setIsCreateItemPostOpen(false);
              }}
              onClose={() => setIsCreateItemPostOpen(false)}
            />
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={() => setIsCreateItemPostOpen(false)} />
      </StyledSheet>
    </>
  );
}

const StyledAddItemButton = styled.button`
  height: 48px;
  border-radius: 8px;
  border: none;
  background-color: white;
  box-shadow: 0px 2px 8px 0px #0000001a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h3 {
    margin: 0 0 0 8px;
  }
`;

const StyledPlusIcon = styled(PlusIcon)`
  width: 14px;
  height: 14px;
  margin: 0 8px 0 0;
`;

const StyledSheet = styled(Sheet)`
  width: 100%;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
`;

const ContentWrapper = styled.div`
  padding: 0 16px 100px 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const FolderTitle = styled.h4`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  img {
    width: 20px;
    height: 20px;
  }
`;

const ItemList = styled.div`
  margin: 12px 0 0 28px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const StyledItemButton = styled.div<{ $isAdded: boolean }>`
  align-self: flex-start;
  font-size: 16px;
  word-break: keep-all;
  background-color: white;
  color: ${({ $isAdded }) => ($isAdded ? "#3C61E6" : "black")};
  text-decoration: ${({ $isAdded }) => ($isAdded ? "underline" : "none")};
`;

const ConfirmButton = styled.button`
  position: fixed;
  bottom: 34px;
  width: 240px;
  height: 48px;
  background-color: #abe5e3;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 20px;
  font-weight: bold;
  left: 50%;
  transform: translateX(-50%);
`;
