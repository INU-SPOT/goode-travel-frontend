import { useEffect } from "react";
import styled from "styled-components";
import WriteHeader from "../components/write/WriteHeader";
import TitleInput from "../components/write/TitleInput";
import WriteTextArea from "../components/write/WriteTextArea";
import ItemsContainer from "../components/write/ItemsContainer";
import AddItemButton from "../components/write/AddItemButton";
import DateRangePicker from "../components/write/DateRangePicker";
import WriteTips from "../components/write/WriteTips";
import { useTemporarySave } from "../hooks/useTemporarySave";

export default function WritePage() {
  const storageKey = "writePageTemporarySaveData";
  const {
    isLoaded,
    checkSavedData,
    resetWriteState,
    saveData,
    showPopup,
    currentTime,
  } = useTemporarySave(storageKey);

  useEffect(() => {
    checkSavedData();
  }, [checkSavedData]);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <WriteContainer>
      <WriteHeader
        saveData={saveData}
        resetWriteState={resetWriteState}
        storageKey={storageKey}
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
