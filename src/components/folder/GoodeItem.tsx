import styled from "styled-components";
import { ItemFolderResponse } from "../../types/item";
import { delete_folders_plan } from "../../services/folder"; // 삭제 API 호출
import { useState } from "react";

export default function GoodeItem({
  image,
  title,
  itemFolderId,
  address,
  folderId, // GoodeItem도 folderId를 받아야 합니다
  onDelete, // 삭제 후 부모 컴포넌트에서 데이터를 다시 가져오기 위한 콜백 함수
}: ItemFolderResponse & { folderId: number; onDelete: (id: number) => void }) {
  const [isDeleting, setIsDeleting] = useState(false); // 삭제 중 상태 표시

  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말 이 항목을 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        setIsDeleting(true);
        await delete_folders_plan(folderId, itemFolderId); // 폴더의 특정 아이템 삭제
        onDelete(itemFolderId); // 삭제 후 부모 컴포넌트에서 아이템을 다시 가져오기 위해 콜백 호출
      } catch (error) {
        console.error("Error deleting item:", error);
      } finally {
        setIsDeleting(false); // 삭제 후 로딩 상태 해제
      }
    }
  };

  return (
    <GoodeItemContainer>
      {image && <ItemImage src={image} alt={title} />}
      <ItemDetails>
        <Title>{title}</Title>
        <ButtonGroup>
          <button>{address}</button>
          <button onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "삭제 중..." : "삭제"}
          </button>
        </ButtonGroup>
      </ItemDetails>
    </GoodeItemContainer>
  );
}

const GoodeItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: aliceblue; */
  height: 65px;
  width: 100%;
  margin-bottom: 18px;
`;

const ItemImage = styled.img`
  height: 100%;
  width: 65px;
  border-radius: 50%;
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

const Title = styled.span`
  font-size: 17px;
  margin: 2px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;

  button {
    margin-right: 10px;
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
