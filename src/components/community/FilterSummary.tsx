import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/icons/search-icon.svg";
import { ReactComponent as XIcon } from "../../assets/icons/x-icon.svg";
import { City, Filters } from "../../types/common";

interface FilterSummaryProps {
  searchQuery: string;
  filters: Filters;
  removeTheme: (theme: string) => void;
  removeMetropolitanGovernment: (id: City) => void;
  removeLocalGovernment: (id: City) => void;
  clearSearchQuery: () => void;
}

export default function FilterSummary({
  searchQuery,
  filters,
  removeTheme,
  removeMetropolitanGovernment,
  removeLocalGovernment,
  clearSearchQuery,
}: FilterSummaryProps) {
  return (
    <StyledFilterSummary>
      {searchQuery && (
        <FilterItem>
          <StyledSearchIcon /> {searchQuery}
          <RemoveButton
            onClick={() => {
              clearSearchQuery();
            }}
          >
            <StyledXIcon />
          </RemoveButton>
        </FilterItem>
      )}
      {filters.theme.map((item, index) => (
        <FilterItem key={index}>
          # {item}
          <RemoveButton onClick={() => removeTheme(item)}>
            <StyledXIcon />
          </RemoveButton>
        </FilterItem>
      ))}
      {filters.metropolitanGovernments.map((item) => (
        <FilterItem key={item.id}>
          # {item.fullname}
          <RemoveButton onClick={() => removeMetropolitanGovernment(item)}>
            <StyledXIcon />
          </RemoveButton>
        </FilterItem>
      ))}
      {filters.localGovernments.map((item) => (
        <FilterItem key={item.id}>
          # {item.fullname}
          <RemoveButton onClick={() => removeLocalGovernment(item)}>
            <StyledXIcon />
          </RemoveButton>
        </FilterItem>
      ))}
    </StyledFilterSummary>
  );
}

const StyledFilterSummary = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 14px;
  margin: 0 24px;
`;

const FilterItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  color: #3c61e6;
  background-color: #f7f7f7;
  border-radius: 12px;
  box-shadow: 0px 4px 4px 0px #00000040;
`;

const StyledSearchIcon = styled(SearchIcon)`
  width: 14px;
  height: 14px;
  path {
    stroke: #3c61e6;
  }
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0 0 0 4px;
`;

const StyledXIcon = styled(XIcon)`
  width: 10px;
  height: 10px;
  path {
    stroke: #3c61e6;
  }
`;
