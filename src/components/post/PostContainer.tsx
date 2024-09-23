import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { PostDetailResponse } from "../../types/post";
import { get_posts_postid } from "../../services/post";
import PostHeader from "./PostHeader";
import Title from "./Title";
import Content from "./Content";
import ItemsContainer from "./ItemsContainer";
import DateRange from "./DateRange";
import Writer from "./Writer";
import Utility from "./Utility";

export default function PostContainer({ postId }: { postId: number }) {
  const [postDetail, setPostDetail] = useState<PostDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPostDetail = useCallback(async () => {
    try {
      setLoading(true);
      const response = await get_posts_postid(postId);
      setPostDetail(response.data);
    } catch (err) {
      setError("Failed to load post details");
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    if (postId) {
      fetchPostDetail();
    }
  }, [postId, fetchPostDetail]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;
  if (!postDetail) return <h1>No post found</h1>;

  return (
    <Container>
      <PostHeader postId={postDetail.postId} isOwner={postDetail.isOwner} />
      <Title title={postDetail.title} createDate={postDetail.createDate} />
      <Content content={postDetail.firstContent} />
      <ItemsContainer itemPosts={postDetail.itemPosts} />
      <Content content={postDetail.lastContent} />
      <DateRange
        startDate={postDetail.startDate}
        endDate={postDetail.endDate}
      />
      <PostMeta>
        <Writer
          writerId={postDetail.writerId}
          writerNickname={postDetail.writerNickname}
          writerImageName={postDetail.writerImageName}
        />
        <Utility
          postId={postDetail.postId}
          title={postDetail.title}
          likeNum={postDetail.likeNum}
          isPushLike={postDetail.isPushLike}
          commentNum={postDetail.commentNum}
        />
      </PostMeta>
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

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
