import styled from "styled-components";
import CommunityHeader from "../components/community/CommunityHeader";
import FilterSummary from "../components/community/FilterSummary";
import InfiniteScrollComponent from "../components/community/InfiniteScrollComponent";
import usePostsStore from "../store/usePostsStore";

export default function CommunityPage() {
  const {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    removeTheme,
    removeMetropolitanGovernment,
    removeLocalGovernment,
    clearSearchQuery,
  } = usePostsStore();

  return (
    <CommunityContainer>
      <CommunityHeader
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
      <InfiniteScrollComponent searchQuery={searchQuery} filters={filters} />
    </CommunityContainer>
  );
}

const CommunityContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
