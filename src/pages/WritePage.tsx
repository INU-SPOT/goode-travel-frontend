import { useState } from "react";
import styled from "styled-components";
import WriteHeader from "../components/write/WriteHeader";
import TitleInput from "../components/write/TitleInput";
import WriteTextArea from "../components/write/WriteTextArea";
import ItemsContainer from "../components/write/ItemsContainer";
import AddItemButton from "../components/write/AddItemButton";
import DateRangePicker from "../components/write/DateRangePicker";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [firstContent, setFirstContent] = useState("");
  const [lastContent, setLastContent] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <WriteContainer>
      <WriteHeader />
      <TitleInput value={title} onChange={setTitle} />
      <WriteTextArea
        value={firstContent}
        onChange={setFirstContent}
        placeholder="전반적인 여행에 대해 소개해 주세요."
      />
      <ItemsContainer />
      <AddItemButton />
      <WriteTextArea
        value={lastContent}
        onChange={setLastContent}
        placeholder="글을 마무리하는 인사말을 적어주세요."
      />
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
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
