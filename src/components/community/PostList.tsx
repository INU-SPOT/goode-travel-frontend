import styled from "styled-components";
import PostCard from "./PostCard";
import { PostThumbnailResponse } from "../../types/post";

interface PostListProps {
  posts: PostThumbnailResponse[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <StyledPostList>
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </StyledPostList>
  );
}

const StyledPostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 24px 0 24px;
`;
