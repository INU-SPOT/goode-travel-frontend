import styled from "styled-components";
import GoodeHeader from "../components/goode/GoodeHeader";
import FilterSummary from "../components/community/FilterSummary";
import useGoodesStore from "../store/uesGoodesStore";
import GoodeInfiniteScrollComponent from "../components/goode/GoodeInfiniteScrollComponent";

export default function GoodePage() {
  const {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    removeTheme,
    removeMetropolitanGovernment,
    removeLocalGovernment,
    clearSearchQuery,
  } = useGoodesStore();

  return (
    <GoodeContainer>
      <GoodeHeader
        setSearchQuery={setSearchQuery}
        filters={filters}
        setFilters={setFilters}
      />
      <FilterSummary
        searchQuery={searchQuery}
        filters={filters}
        removeTheme={removeTheme}
        removeMetropolitanGovernment={removeMetropolitanGovernment}
        removeLocalGovernment={removeLocalGovernment}
        clearSearchQuery={clearSearchQuery}
      />
      <GoodeInfiniteScrollComponent
        searchQuery={searchQuery}
        filters={filters}
      />
    </GoodeContainer>
  );
}

const GoodeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
