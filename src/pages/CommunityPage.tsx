import styled from "styled-components";
import CommunityHeader from "../components/community/CommunityHeader";
import FilterSummary from "../components/community/FilterSummary";
import InfiniteScrollComponent from "../components/community/InfiniteScrollComponent";
import usePostsStore from "../store/usePostsStore";

export default function CommunityPage() {
  const { searchQuery, filters } = usePostsStore();

  return (
    <CommunityContainer>
      <CommunityHeader />
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
