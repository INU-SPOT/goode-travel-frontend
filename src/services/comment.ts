import axiosInstance from "./axiosInstance";

// 답글 수정하기
export const put_posts_replycomments = async (
  replycommentid: number,
  content: string
) => {
  const response = await axiosInstance.put(
    `v1/posts/replycomments/${replycommentid}`,
    { content: content }
  );
  return response.data;
};

// 답글 삭제하기
export const delete_posts_replycomments = async (replycommentid: number) => {
  const response = await axiosInstance.delete(
    `v1/posts/replycomments/${replycommentid}`
  );
  return response.data;
};

// 댓글 수정하기
export const put_posts_comments = async (
  commentid: number,
  content: string
) => {
  const response = await axiosInstance.put(`v1/posts/comments/${commentid}`, {
    content: content,
  });
  return response.data;
};

// 댓글 삭제하기
export const delete_posts_comments = async (commentid: number) => {
  const response = await axiosInstance.delete(`v1/posts/comments/${commentid}`);
  return response.data;
};

// 답글 신고하기
export const post_posts_report_replycomments = async (
  replyCommentId: number
) => {
  const response = await axiosInstance.post(
    `v1/posts/report/replycomments?replyCommentId=${replyCommentId}`
  );
  return response.data;
};

// 댓글 신고하기
export const post_posts_report_comments = async (commentId: number) => {
  const response = await axiosInstance.post(
    `v1/posts/report/comments?commentId=${commentId}`,
    {
      commentId: commentId,
    }
  );
  return response.data;
};

// 댓글에 답글달기
export const post_posts_replycomments = async (
  commentId: number,
  content: string
) => {
  const response = await axiosInstance.post(`v1/posts/replycomments`, {
    commentId: commentId,
    content: content,
  });
  return response.data;
};

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
