import styled from "styled-components";
import { useEffect, useState } from "react";
import CommunityHeader from "../components/community/CommunityHeader";
import FilterSummary from "../components/community/FilterSummary";
import PostList from "../components/community/PostList";
import usePostsStore from "../store/usePostsStore";
import { get_posts } from "../services/post";
import { PostThumbnailResponse } from "../types/post";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll"; // 새로 만든 Hook import

export default function CommunityPage() {
  const { posts, searchQuery, filters, setPosts } = usePostsStore();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // searchQuery 또는 filters가 변경될 때 페이지 초기화 및 게시물 로드
  useEffect(() => {
    setPage(0);
    setHasMore(true);
    setPosts([]);

    // 페이지 초기화 후 로딩
    const loadPosts = async () => {
      setLoading(true);
      try {
        const response = await get_posts(
          0,
          7,
          filters.metropolitanGovernments.map((city) => city.id),
          filters.localGovernments.map((city) => city.id),
          filters.theme,
          searchQuery
        );
        if (response.data.data.length === 0) {
          setHasMore(false);
        }
        setPosts(response.data.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, filters, setPosts]);

  // 페이지 변경 시 게시물 데이터 가져오기
  useEffect(() => {
    if (page === 0) return;

    const loadPosts = async () => {
      setLoading(true);
      try {
        const response = await get_posts(
          page,
          7,
          filters.metropolitanGovernments.map((city) => city.id),
          filters.localGovernments.map((city) => city.id),
          filters.theme,
          searchQuery
        );
        if (response.data.data.length === 0) {
          setHasMore(false);
        }
        setPosts((prevPosts: PostThumbnailResponse[]) => [
          ...prevPosts,
          ...response.data.data,
        ]);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (hasMore) loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, setPosts, hasMore]);

  const [setLastElement] = useInfiniteScroll({
    hasMore,
    loading,
    callback: () => setPage((prevPage) => prevPage + 1),
  });

  return (
    <CommunityContainer>
      <CommunityHeader />
      <FilterSummary searchQuery={searchQuery} filters={filters} />
      <PostList posts={posts} />
      {hasMore && <div ref={setLastElement} />} {/* 마지막 게시물 감시 */}
    </CommunityContainer>
  );
}

const CommunityContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
