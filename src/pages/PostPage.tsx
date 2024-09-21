import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { get_posts_postid } from "../services/post";
import { PostDetailResponse } from "../types/post";
import PostHeader from "../components/post/PostHeader";
import Title from "../components/post/Title";
import Content from "../components/post/Content";
import ItemsContainer from "../components/post/ItemsContainer";
import DateRange from "../components/post/DateRange";
import Writer from "../components/post/Writer";
import Utility from "../components/post/Utility";

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const [postDetail, setPostDetail] = useState<PostDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        setLoading(true);
        const response = await get_posts_postid(Number(id));
        setPostDetail(response.data);
      } catch (err) {
        setError("Failed to load post details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPostDetail();
    }
  }, [id]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;
  if (!postDetail) return <h1>No post found</h1>;

  return (
    <PostContainer>
      <PostHeader isOwner={postDetail.isOwner} />
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
    </PostContainer>
  );
}

const PostContainer = styled.div`
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
