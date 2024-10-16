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
import { post_items } from "../../services/item";
import { post_folders_plan, put_folders_plan } from "../../services/folder";
import { COLOR } from "../../utils/color";
import { ItemFolderResponse } from "../../types/item";

interface CreateFolderItemProps {
  folderId: number;
  editingItem?: ItemFolderResponse;
  onComplete: () => void;
  resetForm: () => void;
}

export default function CreateFolderItem({
  folderId,
  editingItem,
  onComplete,
  resetForm,
}: CreateFolderItemProps) {
  const [newTitle, setNewTitle] = useState<string>(editingItem?.title || "");
  const [address, setAddress] = useState<string>(editingItem?.address || "");
  const [selectedEmoji, setSelectedEmoji] = useState<string>(
    editingItem?.image || ""
  );
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedLocal, setSelectedLocal] = useState<City | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false); // 중복 호출 방지 상태

  // 컴포넌트가 마운트되거나 editingItem이 변경될 때 상태 초기화
  useEffect(() => {
    if (editingItem) {
      setNewTitle(editingItem.title);
      setAddress(editingItem.address || "");
      setSelectedEmoji(editingItem.image || "");

      // localGovernmentId를 기반으로 selectedCity 및 selectedLocal 설정
      const city = metropolitan_government.find((c) =>
        local_government
          .find((lg) => lg.metropolitanId === c.id)
          ?.districts.some((d) => d.id === editingItem.localGovernmentId)
      );
      const local = local_government
        .find((gov) => gov.metropolitanId === (city?.id || 0))
        ?.districts.find((d) => d.id === editingItem.localGovernmentId);

      setSelectedCity(city || null);
      setSelectedLocal(local || null);
    } else {
      setNewTitle("");
      setAddress("");
      setSelectedEmoji("");
      setSelectedCity(null);
      setSelectedLocal(null);
    }
  }, [editingItem]);

  const handleAddOrUpdateItem = async () => {
    if (isCreating) return; // API 호출 중이면 중복 호출 방지

    setIsCreating(true); // API 호출 중 상태 설정

    if (!selectedCity && !selectedLocal) {
      alert("지역을 선택해주세요.");
      setIsCreating(false); // 오류 발생 시 상태 해제
      return;
    }

    // 세종특별자치시(8번) 이외에 시/군/구 필수 선택
    if (!selectedLocal && selectedCity?.id !== 8) {
      alert("시/군/구를 선택해주세요.");
      setIsCreating(false); // 오류 발생 시 상태 해제
      return;
    }

    if (newTitle.trim() === "") {
      alert("계획의 이름을 입력해주세요.");
      setIsCreating(false); // 오류 발생 시 상태 해제
      return;
    }

    const finalEmoji = selectedEmoji || "❓";

    const itemData: ItemCreateUpdateRequest = {
      type: "PLAN",
      title: newTitle.trim(),
      imageUrl: finalEmoji,
      // 세종특별자치시일 경우 localGovernmentId는 229로 설정
      localGovernmentId: selectedCity?.id === 8 ? 229 : selectedLocal!.id,
      address: address.trim(),
    };

    try {
      if (editingItem) {
        const updatedData: ItemFolderUpdateRequest = {
          itemFolderId: editingItem.itemFolderId,
          title: newTitle.trim(),
          emoji: finalEmoji,
          localGovernmentId: selectedCity?.id === 8 ? 229 : selectedLocal!.id,
          address: address.trim(),
        };
        await put_folders_plan(updatedData);
      } else {
        const itemResponse = await post_items(itemData);
        const newItemId = itemResponse.data;

        const folderPlanData: ItemFolderCreateRequest = {
          itemId: newItemId,
          emoji: finalEmoji,
        };
        await post_folders_plan(folderPlanData, folderId);
      }

      onComplete();
      resetForm();
    } catch (error) {
      alert("계획을 저장하는 중 오류가 발생했습니다.");
    } finally {
      setIsCreating(false); // API 호출 완료 후 상태 해제
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

      {selectedCity && selectedCity.id !== 8 && (
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

      <ConfirmButton onClick={handleAddOrUpdateItem} disabled={isCreating}>
        {isCreating ? "생성 중..." : "완료"}
      </ConfirmButton>
    </AddPlanItemContainer>
  );
}

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
