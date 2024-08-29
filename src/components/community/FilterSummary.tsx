import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/icons/search-icon.svg";

interface FilterSummaryProps {
  searchQuery: string;
  filters: {
    theme: string[];
    district: string[];
  };
}

export default function FilterSummary({
  searchQuery,
  filters,
}: FilterSummaryProps) {
  const itemsToDisplay = [
    ...(searchQuery ? [searchQuery] : []),
    ...filters.theme,
    ...filters.district,
  ];

  return (
    <StyledFilterSummary>
      {itemsToDisplay.map((item, index) => (
        <FilterItem key={index}>
          {index === 0 && searchQuery ? <StyledSearchIcon /> : "#"}
          {item}
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
