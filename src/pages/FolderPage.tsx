import { useEffect, useState } from "react";
import styled from "styled-components";
import { delete_folders, get_folders, post_folders } from "../services/folder";
import { FolderListResponse, FolderCreateRequest } from "../types/folder";
import FolderBlock from "../components/folder/FolderBlock";
import { COLOR } from "../utils/color";
import PlusIcon from "../assets/icons/plus-icon.svg";

export default function FolderPage() {
  const [folders, setFolders] = useState<FolderListResponse[]>([]);
  const [isAddingFolder, setIsAddingFolder] = useState(false); // 폴더 추가 모드 상태
  const [newFolderName, setNewFolderName] = useState(""); // 폴더명 입력 상태

  // 폴더 목록 가져오기
  const fetchFolders = async () => {
    try {
      const folderData = await get_folders();
      const foldersArray = Array.isArray(folderData)
        ? folderData
        : folderData.data || [];
      setFolders(foldersArray);
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  const handleDeleteFolder = async (folderId: number) => {
    try {
      await delete_folders(folderId);
      fetchFolders(); // 폴더 목록 새로고침
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 22) {
      setNewFolderName(value);
    } else {
      alert("폴더명은 22자 이내로 작성해주세요.");
      return;
    }
  };

  // 폴더 추가 API 호출
  const handleAddFolder = async () => {
    try {
      const folderData: FolderCreateRequest = {
        title: newFolderName,
      };
      await post_folders(folderData);
      setIsAddingFolder(false); // 폴더 추가 모드 종료
      setNewFolderName(""); // 폴더명 초기화
      fetchFolders(); // 폴더 목록 새로고침
    } catch (error) {
      console.error("Error adding folder:", error);
    }
  };

  useEffect(() => {
    fetchFolders();
    console.log("폴더 재렌더링");
  }, []);

  return (
    <>
      <StyledHeader>
        저장된 폴더
        <PlusIconButton onClick={() => setIsAddingFolder(true)}>
          <img src={PlusIcon} alt="Add Folder" />
        </PlusIconButton>
      </StyledHeader>

      {isAddingFolder ? (
        <AddFolderContainer>
          <Text>새 폴더</Text>
          <Input
            type="text"
            placeholder="폴더명을 입력하세요."
            value={newFolderName}
            onChange={handleInputChange}
          />
          <ButtonContainer>
            <ConfirmButton onClick={handleAddFolder}>확인</ConfirmButton>
            <CancelButton onClick={() => setIsAddingFolder(false)}>
              취소
            </CancelButton>
          </ButtonContainer>
        </AddFolderContainer>
      ) : (
        <FolderContainer>
          {folders.length > 0 ? (
            folders.map((folder) => (
              <FolderBlock
                key={folder.folderId}
                folder={folder}
                onDelete={handleDeleteFolder}
              />
            ))
          ) : (
            <p>폴더가 없습니다.</p>
          )}
        </FolderContainer>
      )}
    </>
  );
}

const FolderContainer = styled.div`
  height: 100%;
  display: grid;
  padding: 0 24px;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
`;

const StyledHeader = styled.header`
  width: 100%;
  height: 72px;
  font-size: 28px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${COLOR.blue};
  padding: 0 24px;
  margin-bottom: 24px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
`;

const PlusIconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 22px;
    height: 22px;
  }
`;

const AddFolderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Text = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 18px;
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #000000;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 150px;
  display: flex;
  gap: 18px;
`;

const ConfirmButton = styled.button`
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

const CancelButton = styled.button`
  background-color: #e7e7e7;
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
