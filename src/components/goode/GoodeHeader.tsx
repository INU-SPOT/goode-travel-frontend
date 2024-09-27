import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as FilterIcon } from "../../assets/icons/filter-icon.svg";
import FilterSheet from "../community/FilterSheet";
import { Filters } from "../../types/common";

interface GoodeHeaderProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

export default function GoodeHeader({ filters, setFilters }: GoodeHeaderProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      <StyledHeader>
        <h2>굳이?</h2>
        <IconGroup>
          <IconButton onClick={() => setIsFilterOpen(true)}>
            <StyledIcon as={FilterIcon} />
          </IconButton>
        </IconGroup>
      </StyledHeader>

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
