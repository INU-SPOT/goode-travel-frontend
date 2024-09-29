import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { CommentDetailResponse } from "../../types/comment";
import { get_posts_comments } from "../../services/comment";
import Comment from "./Comment";
import CommentInput from "./CommentInput";

export default function CommentsContainer({ postId }: { postId: number }) {
  const [comments, setComments] = useState<CommentDetailResponse[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<{
    nickname: string | null;
    commentId: number | null;
  }>({
    nickname: null,
    commentId: null,
  });

  const fetchCommentDetail = useCallback(async () => {
    try {
      setLoading(true);
      const response = await get_posts_comments(postId);
      setComments(response.data);
    } catch (err) {
      setError("Failed to load comment details");
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    if (postId) {
      fetchCommentDetail();
    }
  }, [postId, fetchCommentDetail]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;
  if (!comments) return <h1>No comments found</h1>;

  return (
    <Container>
      {comments.map((comment) => (
        <Comment
          key={comment.commentId}
          comment={comment}
          fetchCommentDetail={fetchCommentDetail}
          setReplyTo={setReplyTo} // 답글 대상 설정
        />
      ))}
      <CommentInput
        postId={postId}
        replyTo={replyTo}
        setReplyTo={setReplyTo} // 답글 대상 해제
        onCommentSubmit={fetchCommentDetail}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: calc(12px + 60px); // '답글 달 남기는 중' 공간 + 댓글 작성 공간
`;
