// 커뮤니티 페이지 글 목록을 관리
import { useEffect } from "react";
import usePostsStore from "../store/usePostsStore";

export const usePosts = () => {
  const { posts, searchQuery, filters, setPosts } = usePostsStore();

  // searchQuery나 filters가 변경될 때마다 게시물을 다시 가져옴
  useEffect(() => {
    const getPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts(searchQuery, filters);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    getPosts();
  }, [searchQuery, filters, setPosts]);

  return { posts, searchQuery, filters };
};

// TODO: 현재 더미 데이터, 서버 API 연결 필요
const fetchPosts = async (
  query: string,
  filters: { theme: string[]; district: string[] }
) => {
  const allPosts = [
    {
      title: "대전 투어",
      subTitles: ["굳이? 성심당 가서 망고시루 먹기", "남선공원에서 산책하기"],
      likes: 88848,
      comments: 1557,
      author: "ㅈㅎㄱ",
      thumbnail: "",
    },
    {
      title: "노잼 도시 탈출기",
      subTitles: [
        "오월드 가서 동물원 구경하기",
        "뿌리공원에서 나의 성씨 비석 찾기",
      ],
      likes: 84888,
      comments: 1602,
      author: "ㄱㅁㄱ",
      thumbnail: "",
    },
    {
      title: "테스트",
      subTitles: ["굳이? subTitle이 적다면?", "두개 까지만 넣어보자"],
      likes: 12,
      comments: 34,
      author: "ㅇㅁㄱ",
      thumbnail: "",
    },
  ];

  return allPosts;
};

export default usePosts;
