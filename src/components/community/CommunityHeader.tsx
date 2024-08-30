import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/icons/search-icon.svg";
import { ReactComponent as FilterIcon } from "../../assets/icons/filter-icon.svg";
import { ReactComponent as PencilIcon } from "../../assets/icons/pencil-icon.svg";
import SearchSheet from "./SearchSheet";
import FilterSheet from "./FilterSheet";

export default function CommunityHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      <StyledHeader>
        <h2>GOOD, 이 여행!</h2>
        <IconGroup>
          <IconButton onClick={() => setIsSearchOpen(true)}>
            <StyledIcon as={SearchIcon} />
          </IconButton>
          <IconButton onClick={() => setIsFilterOpen(true)}>
            <StyledIcon as={FilterIcon} />
          </IconButton>
          <IconButton>
            <StyledIcon as={PencilIcon} />
          </IconButton>
        </IconGroup>
      </StyledHeader>

      <SearchSheet
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <FilterSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </>
  );
}

const StyledHeader = styled.header`
  height: 72px;
  padding: 0 24px;
  border-bottom: 2px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h2 {
    margin: 0;
  }
`;

const IconGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const StyledIcon = styled.div`
  width: 20px;
  height: 20px;
`;
