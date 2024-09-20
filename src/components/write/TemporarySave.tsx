import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import useWriteStore from "../../store/useWriteStore";
import { ItemPostCreateUpdateRequest } from "../../types/item";
import { PostCreateUpdateRequest } from "../../types/post";

export default function TemporarySave() {
  const [showPopup, setShowPopup] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const storageKey = "writePageTemporarySaveData";

  const {
    title,
    firstContent,
    lastContent,
    startDate,
    endDate,
    itemPosts,
    setTitle,
    setFirstContent,
    setLastContent,
    setStartDate,
    setEndDate,
    addItemPost,
    clearItemPosts,
  } = useWriteStore();

  // 페이지가 로드될 때 localStorage에서 데이터를 확인
  useEffect(() => {
    const resetWriteState = () => {
      setTitle("");
      setFirstContent("");
      setLastContent("");
      setStartDate("");
      setEndDate("");
      clearItemPosts();
    };

    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
      const parsedData = JSON.parse(savedData);

      // 저장된 데이터가 비어있지 않은지 확인
      const hasValidData = !!(
        parsedData.title ||
        parsedData.firstContent ||
        parsedData.lastContent ||
        parsedData.startDate ||
        parsedData.endDate ||
        (parsedData.itemPosts && parsedData.itemPosts.length > 0)
      );
      if (hasValidData) {
        const confirmRestore = window.confirm(
          "임시 저장된 데이터가 있습니다. 불러오시겠습니까?"
        );
        if (confirmRestore) {
          setTitle(parsedData.title || "");
          setFirstContent(parsedData.firstContent || "");
          setLastContent(parsedData.lastContent || "");
          setStartDate(parsedData.startDate || "");
          setEndDate(parsedData.endDate || "");
          clearItemPosts();
          parsedData.itemPosts.forEach((item: ItemPostCreateUpdateRequest) =>
            addItemPost(item)
          );
        } else {
          resetWriteState();
        }
      } else {
        resetWriteState();
      }
    } else {
      resetWriteState();
    }
    setIsLoaded(true);
  }, [
    setTitle,
    setFirstContent,
    setLastContent,
    setStartDate,
    setEndDate,
    addItemPost,
    clearItemPosts,
  ]);

  // 데이터 임시 저장
  const saveData = useCallback(
    (dataToSave?: PostCreateUpdateRequest) => {
      const data = dataToSave || {
        title,
        firstContent,
        lastContent,
        startDate,
        endDate,
        itemPosts,
      };
      localStorage.setItem(storageKey, JSON.stringify(data));

      // 저장 팝업 표시
      const now = new Date();
      const formattedTime = now.toLocaleTimeString();
      setCurrentTime(formattedTime);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000); // 2초 후 팝업 사라짐
    },
    [title, firstContent, lastContent, startDate, endDate, itemPosts]
  );

  // 30초마다 localStorage에 자동 저장
  useEffect(() => {
    if (isLoaded) {
      const interval = setInterval(() => {
        const latestState = {
          title: useWriteStore.getState().title,
          firstContent: useWriteStore.getState().firstContent,
          lastContent: useWriteStore.getState().lastContent,
          startDate: useWriteStore.getState().startDate,
          endDate: useWriteStore.getState().endDate,
          itemPosts: useWriteStore.getState().itemPosts,
        };
        saveData(latestState);
      }, 30000); // 30초마다 실행

      return () => clearInterval(interval); // 컴포넌트가 언마운트되면 인터벌 제거
    }
  }, [isLoaded, saveData]);

  return (
    <>
      {showPopup && (
        <Popup>
          <div>{currentTime}</div>
          <div>임시 저장되었습니다.</div>
        </Popup>
      )}
      <button onClick={() => saveData()}>임시 저장</button>
    </>
  );
}

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
