import styled from "styled-components";
import WriteHeader from "../components/write/WriteHeader";
import TitleInput from "../components/write/TitleInput";
import WriteTextArea from "../components/write/WriteTextArea";
import ItemsContainer from "../components/write/ItemsContainer";
import AddItemButton from "../components/write/AddItemButton";
import DateRangePicker from "../components/write/DateRangePicker";
import WriteTips from "../components/write/WriteTips";

export default function WritePage() {
  return (
    <WriteContainer>
      <WriteHeader />
      <TitleInput />
      <WriteTextArea placeholder="전반적인 여행에 대해 소개해 주세요." />
      <ItemsContainer />
      <AddItemButton />
      <WriteTextArea placeholder="글을 마무리하는 인사말을 적어주세요." />
      <DateRangePicker />
      <WriteTips />
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
