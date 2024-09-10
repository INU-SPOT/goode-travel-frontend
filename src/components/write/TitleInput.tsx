import styled from "styled-components";
import useWriteStore from "../../store/useWriteStore";

export default function TitleInput() {
  const { title, setTitle } = useWriteStore();

  return (
    <StyledTitleInput
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="제목"
    />
  );
}

const StyledTitleInput = styled.input`
  padding-bottom: 12px;
  border: none;
  border-bottom: 2px solid #666666;
  outline: none;
  font-size: 18px;
  font-weight: bold;
  &::placeholder {
    color: #aaa;
  }
  &:focus {
    border-bottom: 2px solid #3c61e6;
  }
`;
