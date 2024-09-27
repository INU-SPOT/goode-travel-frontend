import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { get_folders_folderid } from "../../services/folder";
import { FolderDetailResponse } from "../../types/folder";
import { COLOR } from "../../utils/color";
import PlanItem from "./PlanItem";
import GoodeItem from "./GoodeItem";
import PlusIcon from "../../assets/icons/plus-icon.svg";
import CreateFolderItem from "./CreateFolderItem";
import { ItemFolderResponse } from "../../types/item";

export default function FolderDetail() {
  const { folderId } = useParams<{ folderId: string }>();
  const [folderDetail, setFolderDetail] = useState<FolderDetailResponse | null>(
    null
  );
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState<ItemFolderResponse | null>(
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

  const handleEdit = (item: ItemFolderResponse) => {
    setIsAdding(true);
    setEditingItem(item); // No extra properties added
  };

  const resetForm = () => {
    setIsAdding(false);
    setEditingItem(null);
  };

  return (
    <>
      <StyledHeader>
        저장된 폴더
        <PlusIconButton
          onClick={() => {
            if (isAdding) {
              resetForm();
            } else {
              setIsAdding(true);
              setEditingItem(null);
            }
          }}
        >
          <img src={PlusIcon} alt="Add Plan Item" />
        </PlusIconButton>
      </StyledHeader>

      <DetailContainer>
        <Text>{folderDetail.title}</Text>

        {isAdding && (
          <CreateFolderItem
            folderId={Number(folderId)}
            editingItem={editingItem || undefined}
            onComplete={fetchFolderDetail}
            resetForm={resetForm}
          />
        )}

        {!isAdding &&
          folderDetail.itemFolders.map((item) =>
            item.itemType === "PLAN" ? (
              <PlanItem
                key={item.itemFolderId}
                image={item.image}
                title={item.title}
                itemFolderId={item.itemFolderId}
                address={item.address}
                finishDate={item.finishDate}
                isFinished={item.isFinished}
                folderId={folderDetail.folderId}
                onEdit={() => handleEdit(item)}
                onDelete={fetchFolderDetail}
              />
            ) : (
              <GoodeItem
                key={item.itemFolderId}
                image={item.image}
                title={item.title}
                itemFolderId={item.itemFolderId}
                address={item.address}
                folderId={folderDetail.folderId}
                onDelete={fetchFolderDetail}
              />
            )
          )}
      </DetailContainer>
    </>
  );
}

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
