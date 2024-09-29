// src/components/FolderDetail/PlanItem.tsx

import styled from "styled-components";
import { ItemFolderResponse } from "../../types/item";
import {
  put_folders_plan_itempostid,
  delete_folders_plan,
} from "../../services/folder";
import { useEffect, useState } from "react";
import { local_government } from "../../data/districts";

interface PlanItemProps extends ItemFolderResponse {
  folderId: number;
  onDelete: (id: number) => void;
  onEdit: () => void;
}

export default function PlanItem({
  image,
  title,
  itemFolderId,
  finishDate: initialFinishDate,
  address,
  metropolitanGovernmentId,
  localGovernmentId,
  isFinished,
  folderId,
  onDelete,
  onEdit,
}: PlanItemProps) {
  const [finished, setFinished] = useState<boolean>(!!isFinished);
  const [finishDate, setFinishDate] = useState<string | undefined>(
    initialFinishDate
  );

  // 지역구 이름 찾기 로직
  const region = local_government.find(
    (lg) => lg.metropolitanId === metropolitanGovernmentId
  );
  const district = region?.districts.find((d) => d.id === localGovernmentId);
  const regionName = district ? district.fullname : "";

  useEffect(() => {
    setFinished(!!isFinished);
    setFinishDate(initialFinishDate);
  }, [isFinished, initialFinishDate]);

  const handleCheckboxChange = async () => {
    try {
      await put_folders_plan_itempostid(itemFolderId);
      setFinished(!finished);

      if (!finished) {
        const newFinishDate = new Date().toISOString().slice(0, 10);
        setFinishDate(newFinishDate);
      } else {
        setFinishDate(undefined);
      }
    } catch (error) {
      console.error("Error updating completion status:", error);
      alert("완료 상태를 업데이트하는 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말 이 항목을 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        await delete_folders_plan(folderId, itemFolderId);
        onDelete(itemFolderId); // 삭제 후 부모 컴포넌트에서 아이템을 다시 가져오기 위해 콜백 호출
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("아이템을 삭제하는 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <PlanItemContainer>
      <ItemImage>{image}</ItemImage>
      <ItemDetails>
        {finished && <FinishDate>{finishDate}</FinishDate>}
        <Title isFinished={finished}>{title}</Title>
        <ButtonGroup>
          <button>{regionName}</button>
          {address && <button>{address}</button>}
          <button onClick={onEdit}>수정</button>
          <button onClick={handleDelete}>삭제</button>
        </ButtonGroup>
      </ItemDetails>
      <ItemCheckbox>
        <StyledCheckbox
          type="checkbox"
          checked={finished}
          onChange={handleCheckboxChange}
        />
      </ItemCheckbox>
    </PlanItemContainer>
  );
}

const PlanItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 65px;
  width: 100%;
  margin-bottom: 18px;
`;

const ItemImage = styled.div`
  height: 100%;
  width: 65px;
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px 0 0;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-grow: 1;
  margin-right: 10px;
`;

const FinishDate = styled.span`
  color: #b2b2b2;
  font-size: 11px;
  margin: 2px 0;
`;

const Title = styled.span<{ isFinished: boolean }>`
  font-size: 17px;
  margin: 2px 0;
  color: ${({ isFinished }) => (isFinished ? "#b2b2b2" : "#000")};
  text-decoration: ${({ isFinished }) =>
    isFinished ? "line-through" : "none"};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;

  button {
    margin-right: 8px;
    padding: 0;
    color: #b2b2b2;
    font-size: 13px;
    background: none;
    border: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ItemCheckbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
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
