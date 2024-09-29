import { useParams } from "react-router-dom";
import styled from "styled-components";
import PostContainer from "../components/post/PostContainer";
import CommentsContainer from "../components/post/CommentsContainer";

export default function PostPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <PostPageContainer>
      <PostContainer postId={Number(id)} />
      <Line />
      <CommentsContainer postId={Number(id)} />
    </PostPageContainer>
  );
}

const PostPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Line = styled.div`
  height: 2px;
  width: 100%;
  background-color: #e0e0e0;
`;
