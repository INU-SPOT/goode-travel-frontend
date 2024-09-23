import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import WriteHeader from "../components/write/WriteHeader";
import TitleInput from "../components/write/TitleInput";
import WriteTextArea from "../components/write/WriteTextArea";
import ItemsContainer from "../components/write/ItemsContainer";
import AddItemButton from "../components/write/AddItemButton";
import DateRangePicker from "../components/write/DateRangePicker";
import WriteTips from "../components/write/WriteTips";
import { get_posts_postid } from "../services/post";
import useWriteStore from "../store/useWriteStore";
import { useTemporarySave } from "../hooks/useTemporarySave";

export default function WritePage() {
  const { id } = useParams<{ id: string }>(); // edit/:id에서 ID를 받아옴
  const { loadPostData, resetWriteState } = useWriteStore();
  const storageKey = "writePageTemporarySaveData";

  const [isLoaded, setIsLoaded] = useState(false);

  const { checkSavedData, saveData, showPopup, currentTime } = useTemporarySave(
    storageKey,
    !Boolean(id),
    isLoaded,
    setIsLoaded
  );

  // 수정 모드일 때 게시글 데이터 불러오기, 글 작성일 때 임시 저장 게시글 데이터 불러오기
  useEffect(() => {
    if (id) {
      const fetchPostDetail = async () => {
        try {
          const response = await get_posts_postid(Number(id));
          loadPostData(response.data);
          setIsLoaded(true);
        } catch (error) {
          console.error("게시글 데이터를 불러오는데 실패했습니다.", error);
        }
      };
      fetchPostDetail();
    } else {
      checkSavedData();
    }
  }, [id, loadPostData, checkSavedData]);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <WriteContainer>
      <WriteHeader
        saveData={Boolean(id) ? undefined : saveData}
        resetWriteState={resetWriteState}
        storageKey={storageKey}
        isEditMode={Boolean(id)}
        postId={id ? Number(id) : undefined}
      />
      <TitleInput />
      <WriteTextArea placeholder="전반적인 여행에 대해 소개해 주세요." />
      <ItemsContainer />
      <AddItemButton />
      <WriteTextArea placeholder="글을 마무리하는 인사말을 적어주세요." />
      <DateRangePicker />
      <WriteTips />
      {showPopup && (
        <Popup>
          <div>{currentTime}</div>
          <div>임시 저장되었습니다.</div>
        </Popup>
      )}
    </WriteContainer>
  );
}

const WriteContainer = styled.div`
  width: 100%;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Popup = styled.span`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  z-index: 1000;
`;
