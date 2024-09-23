import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FolderListResponse, FolderDetailResponse } from "../../types/folder"; // 타입 import
import {
  get_folders_folderid,
  put_folders_plan_itempostid,
} from "../../services/folder"; // API 함수들

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
        folderDetail.itemFolders.map(
          (item) =>
            item.itemType === "PLAN" && (
              <PlanItem key={item.itemFolderId}>
                <label>
                  <input
                    type="checkbox"
                    checked={item.isFinished}
                    onChange={() => handleCheckboxChange(item.itemFolderId)} // itemFolderId 기반으로 변경
                  />
                  {item.title}
                </label>
              </PlanItem>
            )
        )}
    </BlockContainer>
  );
};

const BlockContainer = styled.div`
  width: 30%;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  text-align: center;
`;

const FolderImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
`;

const FolderTitle = styled.h3`
  font-size: 18px;
  margin: 10px 0;
`;

const CompletionRate = styled.p`
  font-size: 14px;
  color: #555;
`;

const PlanItem = styled.div`
  margin: 10px 0;
`;

export default FolderBlock;
