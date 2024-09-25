// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import styled from "styled-components";
// import {
//   delete_folders_plan,
//   get_folders_folderid,
// } from "../../services/folder";
// import { FolderDetailResponse } from "../../types/folder";
// import { COLOR } from "../../utils/color";
// import PlanItem from "./PlanItem";
// import GoodeItem from "./GoodeItem";
// import PlusIcon from "../../assets/icons/plus-icon.svg";

// export default function FolderDetail() {
//   const { folderId } = useParams<{ folderId: string }>();
//   const [folderDetail, setFolderDetail] = useState<FolderDetailResponse | null>(
//     null
//   );

//   const fetchFolderDetail = async () => {
//     try {
//       const detail = await get_folders_folderid(Number(folderId));
//       setFolderDetail(detail);
//       console.log(detail);
//     } catch (error) {
//       console.error("Error fetching folder details:", error);
//     }
//   };

//   useEffect(() => {
//     fetchFolderDetail();
//   }, [folderId]);

//   if (!folderDetail) return <p>Loading...</p>;

//   const handleDelete = async () => {
//     // 아이템 삭제 시 폴더 내부 데이터를 다시 가져옵니다
//     fetchFolderDetail();
//   };

//   return (
//     <>
//       <StyledHeader>
//         저장된 폴더
//         <PlusIconButton onClick={() => {}}>
//           {" "}
//           {/* 이모지는 하나만 넣게 제한하기 */}
//           <img src={PlusIcon} alt="Add Folder" />
//         </PlusIconButton>
//       </StyledHeader>
//       <DetailContainer>
//         <Text>{folderDetail.title}</Text>
//         {folderDetail.itemFolders.map((item) =>
//           item.itemType === "PLAN" ? (
//             <PlanItem
//               key={item.itemFolderId}
//               image={item.image}
//               title={item.title}
//               itemFolderId={item.itemFolderId}
//               finishDate={item.finishDate}
//               isFinished={item.isFinished}
//               folderId={folderDetail.folderId}
//               onDelete={handleDelete} // 삭제 후 리렌더링을 위한 콜백 전달
//             />
//           ) : (
//             <GoodeItem
//               key={item.itemFolderId}
//               image={item.image}
//               title={item.title}
//               itemFolderId={item.itemFolderId}
//               address={item.address}
//               folderId={folderDetail.folderId}
//               onDelete={handleDelete}
//             />
//           )
//         )}
//       </DetailContainer>
//     </>
//   );
// }

// // 스타일 정의
// const DetailContainer = styled.div`
//   padding: 0 20px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const StyledHeader = styled.header`
//   width: 100%;
//   height: 72px;
//   font-size: 28px;
//   font-weight: bold;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   background-color: ${COLOR.blue};
//   padding: 0 24px;
//   margin-bottom: 24px;
//   box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
// `;

// const PlusIconButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;

//   img {
//     width: 22px;
//     height: 22px;
//   }
// `;

// const Text = styled.div`
//   font-size: 22px;
//   font-weight: bold;
//   margin-bottom: 18px;
// `;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { post_items } from "../../services/items";
import { get_folders_folderid, post_folders_plan } from "../../services/folder";
import { FolderDetailResponse } from "../../types/folder";
import { COLOR } from "../../utils/color";
import PlanItem from "./PlanItem";
import GoodeItem from "./GoodeItem";
import PlusIcon from "../../assets/icons/plus-icon.svg";
import Picker from "@emoji-mart/react";
import { City } from "../../types/common";
import {
  metropolitan_government,
  local_government,
} from "../../data/districts";
import {
  ItemCreateUpdateRequest,
  ItemFolderCreateRequest,
} from "../../types/item";

export default function FolderDetail() {
  const { folderId } = useParams<{ folderId: string }>();
  const [folderDetail, setFolderDetail] = useState<FolderDetailResponse | null>(
    null
  );
  const [isAdding, setIsAdding] = useState(false); // 새로운 PlanItem 추가 모드
  const [newTitle, setNewTitle] = useState(""); // 새로운 PlanItem 제목
  const [selectedEmoji, setSelectedEmoji] = useState(""); // 이모지 선택
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false); // 이모지 피커 열기 상태
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedLocal, setSelectedLocal] = useState<City | null>(null);

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

  const handleAddItem = async () => {
    try {
      if (!selectedCity && !selectedLocal) {
        alert("지역을 선택해주세요.");
        return;
      }

      if (newTitle == "") {
        alert("계획의 이름을 입력해주세요.");
        return;
      }

      const itemData: ItemCreateUpdateRequest = {
        type: "PLAN",
        title: newTitle,
        imageUrl: selectedEmoji,
        localGovernmentId: selectedLocal ? selectedLocal.id : selectedCity!.id,
      };

      // API를 호출하여 아이템을 생성
      const itemResponse = await post_items(itemData);
      const newItemId = itemResponse.data;

      // 폴더에 생성된 아이템을 추가
      const folderPlanData: ItemFolderCreateRequest = {
        folderId: Number(folderId),
        itemId: newItemId,
        emoji: selectedEmoji,
      };

      await post_folders_plan(folderPlanData);

      fetchFolderDetail();
      setIsAdding(false);
      setNewTitle("");
      setSelectedEmoji("");
      setSelectedCity(null);
      setSelectedLocal(null);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setSelectedEmoji(emoji.native);
    setIsEmojiPickerOpen(false);
  };

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setSelectedLocal(null); // 광역시/도를 선택하면 시/군/구 초기화
  };

  const handleLocalSelect = (local: City) => {
    setSelectedLocal(local);
  };

  return (
    <>
      <StyledHeader>
        저장된 폴더
        <PlusIconButton onClick={() => setIsAdding(!isAdding)}>
          <img src={PlusIcon} alt="Add Plan Item" />
        </PlusIconButton>
      </StyledHeader>

      <DetailContainer>
        <Text>{folderDetail.title}</Text>
        {isAdding ? (
          <AddPlanItemContainer>
            <EmojiButtonContainer>
              <EmojiButton
                onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
              >
                {selectedEmoji ? selectedEmoji : "❓"}
              </EmojiButton>
              {isEmojiPickerOpen && (
                <PickerWrapper>
                  <Picker onEmojiSelect={handleEmojiSelect} />
                </PickerWrapper>
              )}
              <TitleInput
                type="text"
                placeholder="계획의 이름을 입력해주세요!"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </EmojiButtonContainer>

            <h3>#광역시/도 선택</h3>
            <FiltersWrapper>
              {metropolitan_government.map((city) => (
                <FilterButton
                  key={city.id}
                  onClick={() => handleCitySelect(city)}
                  selected={selectedCity?.id === city.id}
                >
                  {city.fullname}
                </FilterButton>
              ))}
            </FiltersWrapper>

            {selectedCity && (
              <>
                <h3>#시/군/구 선택</h3>
                <FiltersWrapper>
                  {local_government
                    .find((gov) => gov.metropolitanId === selectedCity.id)
                    ?.districts.map((local) => (
                      <FilterButton
                        key={local.id}
                        onClick={() => handleLocalSelect(local)}
                        selected={selectedLocal?.id === local.id}
                      >
                        {local.name}
                      </FilterButton>
                    ))}
                </FiltersWrapper>
              </>
            )}

            <ConfirmButton onClick={handleAddItem}>생성 완료</ConfirmButton>
          </AddPlanItemContainer>
        ) : (
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

const AddPlanItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmojiButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmojiButton = styled.button`
  width: 40px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 35px;
  margin-right: 10px;
`;

const PickerWrapper = styled.div`
  position: absolute;
  z-index: 1000;
  top: 150px;
`;

const TitleInput = styled.input`
  width: 260px;
  padding: 8px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #000000;
`;

const FiltersWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
`;

const FilterButton = styled.button<{ selected: boolean }>`
  padding: 8px;
  background-color: ${({ selected }) => (selected ? "#3C61E6" : "#ffffff")};
  color: ${({ selected }) => (selected ? "white" : "black")};
  border: 1px solid #3c61e6;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  margin-top: 20px;
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
