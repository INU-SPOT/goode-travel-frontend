import styled from "styled-components";
import CommunityHeader from "../components/community/CommunityHeader";
import FilterSummary from "../components/community/FilterSummary";
import InfiniteScrollComponent from "../components/community/InfiniteScrollComponent";
import usePostsStore from "../store/usePostsStore";

export default function CommunityPage() {
  const { searchQuery, filters, setFilters } = usePostsStore();

  return (
    <CommunityContainer>
      <CommunityHeader filters={filters} setFilters={setFilters} />
      <FilterSummary searchQuery={searchQuery} filters={filters} />
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
