// src/components/folder/CreateFolderItem.tsx 와 유사하게 작성

import { useState } from "react";
import styled from "styled-components";
import Picker from "@emoji-mart/react";
import { City } from "../../types/common";
import {
  metropolitan_government,
  local_government,
} from "../../data/districts";
import {
  ItemCreateUpdateRequest,
  ItemPostCreateUpdateRequest,
  ItemPostImageRequest,
} from "../../types/item";
import { post_items } from "../../services/item";
import { COLOR } from "../../utils/color";

interface CreateItemPostProps {
  onAddItem: (newItem: ItemPostCreateUpdateRequest) => void;
  onClose: () => void;
}

export default function CreateItemPost({
  onAddItem,
  onClose,
}: CreateItemPostProps) {
  const [newTitle, setNewTitle] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [selectedEmoji, setSelectedEmoji] = useState<string>("❓");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedLocal, setSelectedLocal] = useState<City | null>(null);

  // 아이템 추가 함수: 비동기로 수정하여 post_items 호출
  const handleAddItem = async () => {
    if (!selectedCity && !selectedLocal) {
      alert("지역을 선택해주세요.");
      return;
    }

    if (!selectedLocal) {
      alert("시/군/구를 선택해주세요.");
      return;
    }

    if (newTitle.trim() === "") {
      alert("일정의 이름을 입력해주세요.");
      return;
    }

    const finalEmoji = selectedEmoji || "❓";

    const itemData: ItemCreateUpdateRequest = {
      type: "PLAN",
      title: newTitle.trim(),
      imageUrl: finalEmoji,
      localGovernmentId: selectedLocal ? selectedLocal.id : selectedCity!.id,
      address: address.trim(), // 필요에 따라 설정
    };

    try {
      // post_items 호출하여 아이템 생성 및 ID 획득
      const itemResponse = await post_items(itemData);
      const newItemId = itemResponse.data;

      const newItem: ItemPostCreateUpdateRequest = {
        itemPostId: null,
        itemId: newItemId,
        itemTitle: newTitle.trim(),
        content: "",
        images: [] as ItemPostImageRequest[],
      };

      onAddItem(newItem);
    } catch (error) {
      alert("아이템을 추가하는 중 오류가 발생했습니다.");
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
          {selectedEmoji}
        </EmojiButton>
        {isEmojiPickerOpen && (
          <PickerWrapper>
            <Picker onEmojiSelect={handleEmojiSelect} />
          </PickerWrapper>
        )}
        <TitleInput
          type="text"
          placeholder="일정의 이름을 입력해주세요!"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          maxLength={37}
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

      <AddressInput
        type="text"
        placeholder="상세주소를 입력해주세요! (선택 사항)"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <ButtonsWrapper>
        <CancelButton onClick={onClose}>취소</CancelButton>
        <ConfirmButton onClick={handleAddItem}>추가</ConfirmButton>
      </ButtonsWrapper>
    </AddPlanItemContainer>
  );
}

const AddPlanItemContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmojiButtonContainer = styled.div`
  display: flex;
  align-items: center;
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
  top: 50px;
`;

const TitleInput = styled.input`
  width: 260px;
  padding: 8px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #000000;
`;

const AddressInput = styled.input`
  width: 260px;
  padding: 8px;
  margin: 10px 0;
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

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
`;

const ConfirmButton = styled.button`
  background-color: ${COLOR.green};
  font-size: 18px;
  font-weight: bold;
  color: #000000;
  height: 56px;
  width: 100px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background-color: #ccc;
  font-size: 18px;
  font-weight: bold;
  color: #000000;
  height: 56px;
  width: 100px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;
