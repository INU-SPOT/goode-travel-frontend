import { useCallback, useEffect, useState } from "react";
import useWriteStore from "../store/useWriteStore";
import { PostCreateUpdateRequest } from "../types/post";
import { ItemPostCreateUpdateRequest } from "../types/item";

export function useTemporarySave(storageKey: string) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
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

  const resetWriteState = useCallback(() => {
    setTitle("");
    setFirstContent("");
    setLastContent("");
    setStartDate("");
    setEndDate("");
    clearItemPosts();
  }, [
    setTitle,
    setFirstContent,
    setLastContent,
    setStartDate,
    setEndDate,
    clearItemPosts,
  ]);

  // localStorage에서 데이터를 확인
  const checkSavedData = useCallback(() => {
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
      const parsedData = JSON.parse(savedData);

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
    storageKey,
    resetWriteState,
    setTitle,
    setFirstContent,
    setLastContent,
    setStartDate,
    setEndDate,
    addItemPost,
    clearItemPosts,
  ]);

  // 데이터 임시 저장
  const saveData = useCallback(() => {
    console.log("saveData");
    const data: PostCreateUpdateRequest = {
      title,
      firstContent,
      lastContent,
      startDate,
      endDate,
      itemPosts,
    };
    localStorage.setItem(storageKey, JSON.stringify(data));
    // 팝업 표시
    const now = new Date();
    const formattedTime = now.toLocaleTimeString();
    setCurrentTime(formattedTime);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000); // 2초 후 팝업 사라짐
  }, [
    storageKey,
    title,
    firstContent,
    lastContent,
    startDate,
    endDate,
    itemPosts,
  ]);

  // 30초마다 자동 저장
  useEffect(() => {
    if (isLoaded) {
      const interval = setInterval(() => {
        saveData();
      }, 10000);

      return () => clearInterval(interval); // 컴포넌트가 언마운트되면 인터벌 제거
    }
  }, [isLoaded, saveData]);

  return {
    isLoaded,
    saveData,
    checkSavedData,
    resetWriteState,
    showPopup,
    currentTime,
  };
}
