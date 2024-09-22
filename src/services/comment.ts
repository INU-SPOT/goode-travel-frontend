import axiosInstance from "./axiosInstance";

// 게시글에 댓글달기
export const post_posts_comments = async (postId: number, content: string) => {
  const response = await axiosInstance.post(`v1/posts/comments`, {
    postId: postId,
    content: content,
  });
  return response.data;
};

// 게시글 댓글 가져오기
export const get_posts_comments = async (postid: number) => {
  const response = await axiosInstance.get(`v1/posts/${postid}/comments`);
  return response.data;
};
