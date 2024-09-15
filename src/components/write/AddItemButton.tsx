import styled from "styled-components";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus-icon.svg";
import { Sheet } from "react-modal-sheet";
import { useEffect, useState } from "react";
import useWriteStore from "../../store/useWriteStore";

export default function AddItemButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { ItemPosts, addItemPost, removeItemPost } = useWriteStore();
  const [localItems, setLocalItems] = useState<
    { id: number; title: string; content: string }[]
  >([]);

  const dummyItems = [
    { id: 1, title: "굳이? 성심당 가서 망고시루 먹기", content: "" },
    { id: 2, title: "남선공원에서 산책하기", content: "" },
    { id: 3, title: "대동하늘공원에서 일몰 보기", content: "" },
    { id: 4, title: "KAIST 거위 구경하기", content: "" },
    { id: 5, title: "오월드 가서 동물원 구경하기", content: "" },
    { id: 6, title: "뿌리공원에서 나의 성씨 비석 찾기", content: "" },
  ];

  // Sheet가 열릴 때: 전역 상태의 필터를 로컬 상태로 가져오기
  useEffect(() => {
    if (isOpen) {
      setLocalItems([...ItemPosts]);
    }
  }, [isOpen, ItemPosts]);

  // 이미 추가된 항목인지 확인
  const isItemAdded = (id: number) => {
    return localItems.some((item) => item.id === id);
  };

  // 로컬 상태에서 아이템을 추가하거나 제거
  const handleToggleItem = (item: {
    id: number;
    title: string;
    content: string;
  }) => {
    if (localItems.some((localItem) => localItem.id === item.id)) {
      setLocalItems(localItems.filter((localItem) => localItem.id !== item.id)); // 이미 있으면 제거
    } else {
      setLocalItems([...localItems, item]); // 없으면 추가
    }
  };

  // 적용 버튼: 로컬 상태의 아이템을 전역 상태로 set
  const handleConfirm = () => {
    // 로컬 상태에 있는 아이템은 추가
    localItems.forEach((item) => {
      if (!ItemPosts.some((post) => post.id === item.id)) {
        addItemPost(item);
      }
    });

    // 전역 상태에 있고, 로컬 상태에 없는 아이템은 제거
    ItemPosts.forEach((post) => {
      if (!localItems.some((localItem) => localItem.id === post.id)) {
        removeItemPost(post.id);
      }
    });

    setIsOpen(false);
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
              {dummyItems.map((item) => {
                const isAdded = isItemAdded(item.id);
                return (
                  <StyledItemButton
                    key={item.id}
                    onClick={() => handleToggleItem(item)}
                    $isAdded={isAdded}
                  >
                    {item.title}
                  </StyledItemButton>
                );
              })}
              {localItems.length > 0 && (
                <ConfirmButton onClick={handleConfirm}>
                  {localItems.length}개 추가!
                </ConfirmButton>
              )}
            </ContentWrapper>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={() => setIsOpen(false)} />
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

const StyledItemButton = styled.button<{ $isAdded: boolean }>`
  height: 48px;
  margin: 0 24px;
  border-radius: 8px;
  border: none;
  background-color: ${({ $isAdded }) => ($isAdded ? "#ccc" : "white")};
  box-shadow: 0px 2px 8px 0px #0000001a;
  color: ${({ $isAdded }) => ($isAdded ? "#888" : "black")};
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
