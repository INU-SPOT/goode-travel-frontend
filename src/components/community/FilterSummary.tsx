import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/icons/search-icon.svg";
import { ReactComponent as XIcon } from "../../assets/icons/x-icon.svg";
import usePostsStore from "../../store/usePostsStore";

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
  const { removeTheme, removeDistrict, clearSearchQuery } = usePostsStore();

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
          <RemoveButton
            onClick={() => {
              if (index === 0 && searchQuery) {
                clearSearchQuery();
              } else if (filters.theme.includes(item)) {
                removeTheme(item);
              } else if (filters.district.includes(item)) {
                removeDistrict(item);
              }
            }}
          >
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
