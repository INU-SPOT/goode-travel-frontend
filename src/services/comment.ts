import axiosInstance from "./axiosInstance";

// 게시글 댓글 가져오기
export const get_posts_comments = async (postid: number) => {
  const response = await axiosInstance.get(`v1/posts/${postid}/comments`);
  return response.data;
};
