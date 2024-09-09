import styled from "styled-components";

interface TitleInputProps {
  value: string;
  onChange: (newValue: string) => void;
}

export default function TitleInput({ value, onChange }: TitleInputProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <StyledTitleInput
      value={value}
      onChange={handleInputChange}
      placeholder="제목"
    />
  );
}

const StyledTitleInput = styled.input`
  margin: 0 24px;
  padding-bottom: 12px;
  border: none;
  border-bottom: 2px solid #666666;
  outline: none;
  font-size: 16px;
  font-weight: bold;
  &::placeholder {
    color: #aaa;
  }
  &:focus {
    border-bottom: 2px solid #3c61e6;
  }
`;
