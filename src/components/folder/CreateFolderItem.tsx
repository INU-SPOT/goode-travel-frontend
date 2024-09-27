// src/components/FolderDetail/CreateFolderItem.tsx

import { useState, useEffect } from "react";
import styled from "styled-components";
import Picker from "@emoji-mart/react";
import { City } from "../../types/common";
import {
  metropolitan_government,
  local_government,
} from "../../data/districts";
import {
  ItemCreateUpdateRequest,
  ItemFolderCreateRequest,
  ItemFolderUpdateRequest,
} from "../../types/item";
import { post_items } from "../../services/items";
import { post_folders_plan, put_folders_plan } from "../../services/folder";
import { COLOR } from "../../utils/color";
import { ItemFolderResponse } from "../../types/item";

interface CreateFolderItemProps {
  folderId: number;
  editingItem?: ItemFolderResponse;
  onComplete: () => void;
  resetForm: () => void;
}

const CreateFolderItem: React.FC<CreateFolderItemProps> = ({
  folderId,
  editingItem,
  onComplete,
  resetForm,
}) => {
  const [newTitle, setNewTitle] = useState<string>(editingItem?.title || "");
  const [selectedEmoji, setSelectedEmoji] = useState<string>(
    editingItem?.image || ""
  );

  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedLocal, setSelectedLocal] = useState<City | null>(null);

  // 컴포넌트가 마운트되거나 editingItem이 변경될 때 상태 초기화
  useEffect(() => {
    if (editingItem) {
      setNewTitle(editingItem.title);
      setSelectedEmoji(editingItem.image || "");
      setSelectedCity(null);
      setSelectedLocal(null);
    } else {
      setNewTitle("");
      setSelectedEmoji("");
      setSelectedCity(null);
      setSelectedLocal(null);
    }
  }, [editingItem]);

  const handleAddOrUpdateItem = async () => {
    if (!selectedCity && !selectedLocal) {
      alert("지역을 선택해주세요.");
      return;
    }

    if (newTitle.trim() === "") {
      alert("계획의 이름을 입력해주세요.");
      return;
    }

    const finalEmoji = selectedEmoji || "❓";

    const itemData: ItemCreateUpdateRequest = {
      type: "PLAN",
      title: newTitle.trim(),
      imageUrl: finalEmoji,
      localGovernmentId: selectedLocal ? selectedLocal.id : selectedCity!.id,
    };

    try {
      if (editingItem) {
        // Update mode
        const updatedData: ItemFolderUpdateRequest = {
          itemFolderId: editingItem.itemFolderId,
          title: newTitle.trim(),
          emoji: finalEmoji,
          localGovernmentId: selectedLocal
            ? selectedLocal.id
            : selectedCity!.id,
          address: "", // Empty string as requested
        };
        await put_folders_plan(updatedData);
      } else {
        // Creation mode
        const itemResponse = await post_items(itemData);
        const newItemId = itemResponse.data;

        const folderPlanData: ItemFolderCreateRequest = {
          folderId,
          itemId: newItemId,
          emoji: finalEmoji,
        };
        await post_folders_plan(folderPlanData);
      }

      onComplete(); // Notify parent component
      resetForm(); // Reset form
    } catch (error) {
      console.error("Error adding or updating item:", error);
      alert("계획을 저장하는 중 오류가 발생했습니다.");
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setSelectedEmoji(emoji.native);
    setIsEmojiPickerOpen(false);
  };

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setSelectedLocal(null);
  };

  const handleLocalSelect = (local: City) => {
    setSelectedLocal(local);
  };

  return (
    <AddPlanItemContainer>
      <EmojiButtonContainer>
        <EmojiButton onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}>
          {selectedEmoji || "❓"}
        </EmojiButton>
        {isEmojiPickerOpen && (
          <PickerWrapper>
            <Picker onEmojiSelect={handleEmojiSelect} />
          </PickerWrapper>
        )}
        <TitleInput
          type="text"
          placeholder="계획의 이름을 입력해주세요!"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </EmojiButtonContainer>

      <h3>#광역시/도 선택</h3>
      <FiltersWrapper>
        {metropolitan_government.map((city) => (
          <FilterButton
            key={city.id}
            onClick={() => handleCitySelect(city)}
            selected={selectedCity?.id === city.id}
          >
            {city.fullname}
          </FilterButton>
        ))}
      </FiltersWrapper>

      {selectedCity && (
        <>
          <h3>#시/군/구 선택</h3>
          <FiltersWrapper>
            {local_government
              .find((gov) => gov.metropolitanId === selectedCity.id)
              ?.districts.map((local) => (
                <FilterButton
                  key={local.id}
                  onClick={() => handleLocalSelect(local)}
                  selected={selectedLocal?.id === local.id}
                >
                  {local.name}
                </FilterButton>
              ))}
          </FiltersWrapper>
        </>
      )}

      <ConfirmButton onClick={handleAddOrUpdateItem}>
        {editingItem ? "수정 완료" : "생성 완료"}
      </ConfirmButton>
    </AddPlanItemContainer>
  );
};

// 스타일 정의

const AddPlanItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmojiButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 10px;
`;

const EmojiButton = styled.button`
  width: 40px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 35px;
  margin-right: 10px;
`;

const PickerWrapper = styled.div`
  position: absolute;
  z-index: 1000;
  top: 50px; /* 필요에 따라 조정 */
`;

const TitleInput = styled.input`
  width: 260px;
  padding: 8px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #000000;
`;

const FiltersWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  margin-bottom: 10px;
`;

const FilterButton = styled.button<{ selected: boolean }>`
  padding: 8px;
  background-color: ${({ selected }) => (selected ? "#3C61E6" : "#ffffff")};
  color: ${({ selected }) => (selected ? "white" : "black")};
  border: 1px solid #3c61e6;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  margin-top: 20px;
  background-color: ${COLOR.green};
  font-size: 18px;
  font-weight: bold;
  color: #000000;
  height: 56px;
  width: 128px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
`;

export default CreateFolderItem;
