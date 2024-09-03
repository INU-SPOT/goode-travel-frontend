import { useState } from "react";
import { Sheet } from "react-modal-sheet";
import usePostsStore from "../../store/usePostsStore";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/icons/search-icon.svg";

interface SearchSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchSheet({ isOpen, onClose }: SearchSheetProps) {
  const setSearchQuery = usePostsStore((state) => state.setSearchQuery);
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    setSearchQuery(inputValue);
    onClose();
  };

  return (
    <Sheet isOpen={isOpen} onClose={onClose}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <ContentWrapper>
            <StyledInput
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="인천, 빵, 바다 ..."
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <IconWrapper onClick={handleSearch}>
              <StyledSearchIcon />
            </IconWrapper>
          </ContentWrapper>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClose} />
    </Sheet>
  );
}

const ContentWrapper = styled.div`
  padding: 16px;
  display: flex;
  gap: 16px;
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  border: 1px solid #3c61e6;
  font-weight: bold;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3c61e6;
  width: 44px;
  height: 44px;
  border-radius: 8px;
`;

const StyledSearchIcon = styled(SearchIcon)`
  width: 20px;
  height: 20px;
  path {
    stroke: white;
  }
`;
