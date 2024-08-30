import styled from "styled-components";
import CommunityHeader from "../components/community/CommunityHeader";
import FilterSummary from "../components/community/FilterSummary";
import PostList from "../components/community/PostList";
import { usePosts } from "../hooks/usePosts";

export default function CommunityPage() {
  const { posts, searchQuery, filters } = usePosts();

  return (
    <CommunityContainer>
      <CommunityHeader />
      <FilterSummary searchQuery={searchQuery} filters={filters} />
      <PostList posts={posts} />
    </CommunityContainer>
  );
}

const CommunityContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
