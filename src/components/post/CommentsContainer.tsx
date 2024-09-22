import { useEffect, useState } from "react";
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

  const fetchCommentDetail = async () => {
    try {
      setLoading(true);
      const response = await get_posts_comments(postId);
      setComments(response.data);
    } catch (err) {
      setError("Failed to load comment details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchCommentDetail();
    }
  }, [postId]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;
  if (!comments) return <h1>No comments found</h1>;

  return (
    <Container>
      {comments.map((comment) => (
        <Comment key={comment.commentId} comment={comment} />
      ))}
      <CommentInput postId={postId} onCommentSubmit={fetchCommentDetail} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
