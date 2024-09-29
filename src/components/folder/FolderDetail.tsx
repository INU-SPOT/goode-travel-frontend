import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { get_folders_folderid, patch_folders } from "../../services/folder";
import { FolderDetailResponse, FolderUpdateRequest } from "../../types/folder";
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
  const [isEditing, setIsEditing] = useState(false); // 편집 모드 상태
  const [editedTitle, setEditedTitle] = useState<string>(""); // 편집된 제목
  const [originalTitle, setOriginalTitle] = useState<string>(""); // 원래 제목
  const [itemOrder, setItemOrder] = useState<number[]>([]); // 항목 순서
  const [hasTitleChanged, setHasTitleChanged] = useState(false); // 제목 변경 여부
  const [hasSequenceChanged, setHasSequenceChanged] = useState(false); // 순서 변경 여부
  const [editingItem, setEditingItem] = useState<ItemFolderResponse | null>(
    null
  ); // 편집할 항목
  const navigate = useNavigate();

  // 드래그 센서 설정: 터치와 마우스 모두 사용
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 0,
        tolerance: 5,
      },
    })
  );

  // 폴더 상세 정보 가져오기 (useCallback으로 메모이제이션)
  const fetchFolderDetail = useCallback(async () => {
    try {
      const detail = await get_folders_folderid(Number(folderId));
      setFolderDetail(detail);
      setOriginalTitle(detail.title);
      setEditedTitle(detail.title);
      setItemOrder(detail.itemFolders.map((item: any) => item.itemFolderId));
    } catch (error) {
      console.error("Error fetching folder details:", error);
    }
  }, [folderId]);

  // folderId가 변경될 때만 fetchFolderDetail 호출
  useEffect(() => {
    fetchFolderDetail();
  }, [fetchFolderDetail]);

  if (!folderDetail) return <p>Loading...</p>;

  // SortableItem 컴포넌트 정의
  function SortableItem({ id, title }: { id: number; title: string }) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {isEditing ? (
          <EditableItem
            itemId={id}
            initialTitle={title}
            onTitleChange={(newTitle) => handleTitleChange(id, newTitle)}
          />
        ) : (
          <ItemContainer itemId={id} title={title} dragListeners={{}} />
        )}
      </div>
    );
  }

  // EditableItem 컴포넌트: 제목을 편집할 수 있는 입력창
  function EditableItem({
    itemId,
    initialTitle,
    onTitleChange,
  }: {
    itemId: number;
    initialTitle: string;
    onTitleChange: (newTitle: string) => void;
  }) {
    const [title, setTitle] = useState<string>(initialTitle);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
      if (e.target.value !== initialTitle) {
        setHasTitleChanged(true);
      }
    };

    const handleBlur = () => {
      onTitleChange(title);
    };

    return (
      <Input
        type="text"
        value={title}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={initialTitle}
      />
    );
  }

  // ItemContainer 컴포넌트 정의
  function ItemContainer({
    itemId,
    title,
    dragListeners,
  }: {
    itemId: number;
    title: string;
    dragListeners: any;
  }) {
    return (
      <ItemWrapper {...dragListeners}>
        <ItemTitle>{title}</ItemTitle>
      </ItemWrapper>
    );
  }

  // 제목 변경 핸들러
  const handleTitleChange = (itemId: number, newTitle: string) => {
    setFolderDetail((prev) =>
      prev
        ? {
            ...prev,
            itemFolders: prev.itemFolders.map((item) =>
              item.itemFolderId === itemId ? { ...item, title: newTitle } : item
            ),
          }
        : null
    );

    // 제목 변경 여부 판단
    if (editedTitle !== originalTitle && newTitle !== originalTitle) {
      setHasTitleChanged(true);
    }
  };

  const onDragEnd = ({ active, over }: { active: any; over: any }) => {
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = itemOrder.indexOf(active.id);
      const newIndex = itemOrder.indexOf(over.id);

      if (oldIndex === -1 || newIndex === -1) return;

      const newOrder = [...itemOrder];
      newOrder.splice(oldIndex, 1);
      newOrder.splice(newIndex, 0, active.id);

      setItemOrder(newOrder);
      setHasSequenceChanged(true);
    }
  };

  // 저장 핸들러
  const handleSave = async () => {
    const folderData: FolderUpdateRequest = {
      title: hasTitleChanged ? editedTitle : null,
      sequence: hasSequenceChanged ? itemOrder : null,
    };

    try {
      await patch_folders(Number(folderId), folderData);
      setIsEditing(false);
      setHasTitleChanged(false);
      setHasSequenceChanged(false);
      fetchFolderDetail();
    } catch (error) {
      console.error("Error saving folder updates:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  // 편집 버튼 클릭 핸들러
  const toggleEditing = () => {
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(true);
      setEditedTitle(folderDetail.title);
    }
  };

  // resetForm 함수: 폼을 리셋하고 초기 상태로 돌리는 함수
  const resetForm = () => {
    setIsAdding(false);
    setEditingItem(null);
  };

  // handleEdit 함수: 아이템 편집 상태로 전환
  const handleEdit = (item: ItemFolderResponse) => {
    setIsAdding(true);
    setEditingItem(item);
  };

  // handleBackButtonClick 함수: 뒤로가기 버튼 조작
  const handleBackButtonClick = () => {
    if (isEditing) {
      setIsEditing(false); // 편집 모드를 취소
    } else if (isAdding) {
      resetForm(); // 추가 모드를 취소
    } else {
      navigate(-1); // 폴더 상세 페이지에서 나가기
    }
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
        <TitleContainer>
          <BackButton onClick={handleBackButtonClick}>{"<"}</BackButton>
          {isEditing ? (
            <TitleInput
              type="text"
              value={editedTitle}
              onChange={(e) => {
                setEditedTitle(e.target.value);
                if (e.target.value !== originalTitle) {
                  setHasTitleChanged(true);
                } else {
                  setHasTitleChanged(false);
                }
              }}
              placeholder={originalTitle}
            />
          ) : (
            <Text>{folderDetail.title}</Text>
          )}
          <EditButton onClick={toggleEditing}>
            {isEditing ? "완료" : "편집"}
          </EditButton>
        </TitleContainer>

        {isEditing ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
          >
            <SortableContext
              items={itemOrder}
              strategy={verticalListSortingStrategy}
            >
              <Container>
                {itemOrder.map((itemId) => {
                  const item = folderDetail.itemFolders.find(
                    (item) => item.itemFolderId === itemId
                  );
                  if (!item) return null;
                  return (
                    <SortableItem
                      key={item.itemFolderId}
                      id={item.itemFolderId}
                      title={item.title}
                    />
                  );
                })}
              </Container>
            </SortableContext>
          </DndContext>
        ) : isAdding ? (
          <CreateFolderItem
            folderId={Number(folderId)}
            editingItem={editingItem || undefined}
            onComplete={fetchFolderDetail}
            resetForm={resetForm}
          />
        ) : (
          <Container>
            {folderDetail.itemFolders.map((item) =>
              item.itemType === "PLAN" ? (
                <PlanItem
                  key={item.itemFolderId}
                  image={item.image}
                  title={item.title}
                  itemFolderId={item.itemFolderId}
                  address={item.address}
                  localGovernmentId={item.localGovernmentId}
                  metropolitanGovernmentId={item.metropolitanGovernmentId}
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
                  localGovernmentId={item.localGovernmentId}
                  metropolitanGovernmentId={item.metropolitanGovernmentId}
                  folderId={folderDetail.folderId}
                  onDelete={fetchFolderDetail}
                />
              )
            )}
          </Container>
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
  position: relative;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 22px;
  color: #000000;
  cursor: pointer;
  position: absolute;
  left: 24px; /* 화면 좌측으로 배치 */
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

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 18px;
  justify-content: center;
  position: relative;
`;

const Text = styled.div`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  flex-grow: 1;
`;

const EditButton = styled.button`
  font-size: 17px;
  border: none;
  background: none;
  color: #8e8e8e;
  position: absolute;
  right: 10px;
  cursor: pointer;
`;

const TitleInput = styled.input`
  width: 70%;
  padding: 8px;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ItemWrapper = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  display: flex;
  align-items: center;
`;

const ItemTitle = styled.div`
  font-size: 18px;
  flex-grow: 1;
`;
