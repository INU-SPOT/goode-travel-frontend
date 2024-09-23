import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FolderListResponse, FolderDetailResponse } from "../../types/folder";
import {
  get_folders_folderid,
  put_folders_plan_itempostid,
} from "../../services/folder";

interface FolderBlockProps {
  folder: FolderListResponse;
}

const FolderBlock: React.FC<FolderBlockProps> = ({ folder }) => {
  const [completionRate, setCompletionRate] = useState<number | undefined>(
    undefined
  );
  const [folderDetail, setFolderDetail] = useState<FolderDetailResponse | null>(
    null
  );

  // PLAN 완료도 계산
  const fetchCompletionRate = async () => {
    try {
      const folderDetail: FolderDetailResponse = await get_folders_folderid(
        folder.folderId
      );
      setFolderDetail(folderDetail);
      const planItems = folderDetail.itemFolders.filter(
        (item) => item.itemType === "PLAN"
      );
      const completedPlans = planItems.filter((item) => item.isFinished).length;
      const completionRate =
        planItems.length > 0 ? (completedPlans / planItems.length) * 100 : 0;
      setCompletionRate(completionRate);
    } catch (error) {
      console.error(
        `Error fetching folder details for folderId ${folder.folderId}:`,
        error
      );
    }
  };

  useEffect(() => {
    fetchCompletionRate();
  }, [folder.folderId]);

  // 체크박스 변경 핸들러 (itemFolderId 기반)
  const handleCheckboxChange = async (itemFolderId: number) => {
    try {
      await put_folders_plan_itempostid(itemFolderId); // itemFolderId로 업데이트
      fetchCompletionRate(); // 완료도 재계산
    } catch (error) {
      console.error("Error updating item status:", error);
    }
  };

  return (
    <BlockContainer>
      <FolderImage src={folder.image} alt={folder.title} />
      <FolderTitle>{folder.title}</FolderTitle>
      <CompletionRate>
        {completionRate !== undefined ? `${completionRate}%` : "Loading..."}
      </CompletionRate>
      {folderDetail &&
        folderDetail.itemFolders && // folderDetail 및 itemFolders가 존재하는지 확인
        folderDetail.itemFolders.map((item) => (
          <PlanItem key={item.itemFolderId}>
            {item.itemType === "PLAN" ? (
              <label>
                <input
                  type="checkbox"
                  checked={item.isFinished}
                  onChange={() => handleCheckboxChange(item.itemFolderId)} // itemFolderId 기반으로 변경
                />
                {item.title}
              </label>
            ) : (
              <span>{item.title}</span> // PLAN이 아닌 경우 제목만 표시
            )}
          </PlanItem>
        ))}
    </BlockContainer>
  );
};

const BlockContainer = styled.div`
  width: 100%;
  padding: 18px;
  border-radius: 13px;
  background-color: #e2e2e2;
  text-align: center;
`;

const FolderImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
`;

const FolderTitle = styled.h3`
  font-size: 17px;
  margin: 5px 0;
`;

const CompletionRate = styled.p`
  font-size: 14px;
  color: #555;
`;

const PlanItem = styled.div`
  font-size: 12px;
  margin: 5px 0;
`;

export default FolderBlock;
