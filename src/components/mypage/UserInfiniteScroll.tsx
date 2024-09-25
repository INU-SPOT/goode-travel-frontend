import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { get_users_posts, get_users_posts_like } from "../../services/post";
import PostList from "../../components/community/PostList";
import { PostThumbnailResponse } from "../../types/post";

interface UserInfiniteScrollProps {
  type: "posts" | "likes"; // "posts" = 작성글, "likes" = 좋아요 한 글
  isActive: boolean;
}

export default function UserInfiniteScroll({
  type,
  isActive,
}: UserInfiniteScrollProps) {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState<PostThumbnailResponse[]>([]);

  // 데이터 로드 함수
  const fetchData = async () => {
    try {
      const response =
        type === "posts"
          ? await get_users_posts(page, 7)
          : await get_users_posts_like(page, 7);
      const { currentPage, totalPages, data: postData } = response.data;

      setPosts((prevPosts: PostThumbnailResponse[]) =>
        page === 0 ? postData : [...prevPosts, ...postData]
      );
      if (currentPage >= totalPages - 1) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  // 페이지 변경 또는 첫 렌더링 시 데이터 로드
  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={() => {
        if (isActive) {
          setPage((prevPage) => prevPage + 1);
        }
      }} // 활성 탭에서만 페이지 증가
      hasMore={hasMore && isActive} // 활성 탭에서만 더 가져오기
      loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
      endMessage={
        <h4 style={{ textAlign: "center" }}>더 이상 게시물이 없습니다.</h4>
      }
      style={{ paddingTop: "12px", paddingBottom: "12px" }}
    >
      <PostList posts={posts} />
    </InfiniteScroll>
  );
}
