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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부 확인 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리

  // 로그인 여부 확인
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
      fetchFolders();
    } else {
      setIsLoggedIn(false);
      setIsLoading(false); // 로그인이 안 되어 있을 때 로딩을 멈춤
    }
  }, []);

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
    } finally {
      setIsLoading(false); // 폴더 데이터를 불러오면 로딩을 멈춤
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

  if (isLoading) {
    return <Loading>Loading...</Loading>; // 로딩 상태일 때 로딩 메시지 표시
  }

  return (
    <>
      <StyledHeader>
        저장된 폴더
        {isLoggedIn && (
          <PlusIconButton onClick={() => setIsAddingFolder(true)}>
            <img src={PlusIcon} alt="Add Folder" />
          </PlusIconButton>
        )}
      </StyledHeader>

      {isLoggedIn ? (
        isAddingFolder ? (
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
        ) : folders.length > 0 ? (
          <FolderContainer>
            {folders.map((folder) => (
              <FolderBlock
                key={folder.folderId}
                folder={folder}
                onDelete={handleDeleteFolder}
              />
            ))}
          </FolderContainer>
        ) : (
          <NoFolder>폴더를 생성해보세요!</NoFolder>
        )
      ) : (
        <NoFolder>로그인 후 이용 가능합니다.</NoFolder>
      )}
    </>
  );
}

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: bold;
  margin-top: 50%;
`;

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

const NoFolder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 18px;
`;
