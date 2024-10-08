import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/icons/search-icon.svg";
import { ReactComponent as FilterIcon } from "../../assets/icons/filter-icon.svg";
import { ReactComponent as PencilIcon } from "../../assets/icons/pencil-icon.svg";
import SearchSheet from "./SearchSheet";
import FilterSheet from "./FilterSheet";
import { useNavigate } from "react-router-dom";
import { Filters } from "../../types/common";

interface CommunityHeaderProps {
  setSearchQuery: (query: string) => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

export default function CommunityHeader({
  setSearchQuery,
  filters,
  setFilters,
}: CommunityHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();

  const handleWriteClick = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("로그인이 필요합니다!");
      navigate("/login");
    } else {
      navigate("/write");
    }
  };

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
          <IconButton onClick={handleWriteClick}>
            <StyledIcon as={PencilIcon} />
          </IconButton>
        </IconGroup>
      </StyledHeader>

      <SearchSheet
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        setSearchQuery={setSearchQuery}
      />
      <FilterSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
      />
    </>
  );
}

const StyledHeader = styled.header`
  height: 72px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h2 {
    margin: 0;
  }
  background-color: #abe5e3;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
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
