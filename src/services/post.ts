import axios from "axios";

// 게시글 목록(썸네일) 불러오기 기능 **페이징**
export const get_posts = async (page: number, size: number) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/v1/posts?page=${page}&size=${size}`
  );
  return response.data;
};
