import { useEffect, useState } from "react";
import styled from "styled-components";
import { get_folders } from "../services/folder"; // API 함수들
import { FolderListResponse } from "../types/folder"; // 타입 import
import FolderBlock from "../components/folder/FolderBlock"; // FolderBlock import

export default function FolderPage() {
  const [folders, setFolders] = useState<FolderListResponse[]>([]); // 초기값을 빈 배열로 설정

  // 폴더 목록 가져오기
  const fetchFolders = async () => {
    try {
      const folderData = await get_folders();
      console.log(folderData);
      const foldersArray = Array.isArray(folderData)
        ? folderData
        : folderData.data || []; // 'data' 필드로 변경

      setFolders(foldersArray);
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <FolderContainer>
      {folders.length > 0 ? (
        folders.map((folder) => (
          <FolderBlock key={folder.folderId} folder={folder} />
        ))
      ) : (
        <p>No folders available</p> // 폴더가 없을 때 메시지 출력
      )}
    </FolderContainer>
  );
}

const FolderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
`;
