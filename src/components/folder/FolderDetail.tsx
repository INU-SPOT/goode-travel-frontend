import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  delete_folders_plan,
  get_folders_folderid,
} from "../../services/folder";
import { FolderDetailResponse } from "../../types/folder";
import { COLOR } from "../../utils/color";
import PlanItem from "./PlanItem";
import GoodeItem from "./GoodeItem";
import PlusIcon from "../../assets/icons/plus-icon.svg";

export default function FolderDetail() {
  const { folderId } = useParams<{ folderId: string }>();
  const [folderDetail, setFolderDetail] = useState<FolderDetailResponse | null>(
    null
  );

  const fetchFolderDetail = async () => {
    try {
      const detail = await get_folders_folderid(Number(folderId));
      setFolderDetail(detail);
    } catch (error) {
      console.error("Error fetching folder details:", error);
    }
  };

  useEffect(() => {
    fetchFolderDetail();
  }, [folderId]);

  if (!folderDetail) return <p>Loading...</p>;

  const handleDelete = async () => {
    // 삭제 후 데이터를 다시 가져옴
    fetchFolderDetail();
  };

  return (
    <>
      <StyledHeader>
        저장된 폴더
        <PlusIconButton onClick={() => {}}>
          {" "}
          {/* 이모지는 하나만 넣게 제한하기 */}
          <img src={PlusIcon} alt="Add Folder" />
        </PlusIconButton>
      </StyledHeader>
      <DetailContainer>
        <Text>{folderDetail.title}</Text>
        {folderDetail.itemFolders.map((item) =>
          item.itemType === "PLAN" ? (
            <PlanItem
              key={item.itemFolderId}
              image={item.image}
              title={item.title}
              itemFolderId={item.itemFolderId}
              finishDate={item.finishDate}
              isFinished={item.isFinished}
              folderId={folderDetail.folderId}
              onDelete={handleDelete} // 삭제 후 리렌더링을 위한 콜백 전달
            />
          ) : (
            <GoodeItem
              key={item.itemFolderId}
              image={item.image}
              title={item.title}
              itemFolderId={item.itemFolderId}
              address={item.address}
              folderId={folderDetail.folderId}
              onDelete={handleDelete}
            />
          )
        )}
      </DetailContainer>
    </>
  );
}

// 스타일 정의
const DetailContainer = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const Text = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 18px;
`;
