import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { get_items } from "../../services/item";
import { ItemsResponse } from "../../types/item";
import GoodeList from "./GoodeList";
import { Filters } from "../../types/common";
import useGoodesStore from "../../store/uesGoodesStore";

interface InfiniteScrollComponentProps {
  searchQuery: string;
  filters: Filters;
}

export default function GoodeInfiniteScrollComponent({
  searchQuery,
  filters,
}: InfiniteScrollComponentProps) {
  const { goodes, setGoodes } = useGoodesStore();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // 검색어 또는 필터 변경 시 초기화 및 첫 페이지 로드
  useEffect(() => {
    setPage(0);
    setHasMore(true);
    setGoodes([]);
  }, [searchQuery, filters, setGoodes]);

  // 페이지 변경 시 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get_items(
          page,
          14,
          filters.metropolitanGovernments.map((city) => city.id),
          filters.localGovernments.map((city) => city.id),
          filters.theme,
          searchQuery
        );

        const { currentPage, totalPages, data: postData } = response.data;
        // 게시물 업데이트
        setGoodes((prevPosts: ItemsResponse[]) =>
          page === 0 ? postData : [...prevPosts, ...postData]
        );

        // 페이지 수에 따라 hasMore 설정
        if (currentPage >= totalPages - 1) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchQuery, filters]);

  return (
    <InfiniteScroll
      dataLength={goodes.length}
      next={() => setPage((prevPage) => prevPage + 1)}
      hasMore={hasMore}
      loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
      endMessage={
        <h4 style={{ textAlign: "center" }}>더 이상 게시물이 없습니다.</h4>
      }
      style={{ paddingTop: "12px", paddingBottom: "12px" }} // 인라인 스타일 추가
    >
      <GoodeList goodes={goodes} />
    </InfiniteScroll>
  );
}
