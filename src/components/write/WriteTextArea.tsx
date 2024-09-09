import styled from "styled-components";

interface WriteTextAreaPorps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder: string;
}

export default function WriteTextArea({
  value,
  onChange,
  placeholder,
}: WriteTextAreaPorps) {
  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
    event.currentTarget.style.height = "auto"; // 입력할 때마다 높이를 초기화
    event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`; // 입력에 따른 스크롤 높이를 적용
  };

  return (
    <StyledWriteTextArea
      value={value}
      onInput={handleInput}
      placeholder={placeholder}
    />
  );
}

const StyledWriteTextArea = styled.textarea`
  border: none;
  outline: none;
  font-size: 14px;
  overflow: hidden;
  resize: none;
  &::placeholder {
    color: #aaa;
  }
`;
