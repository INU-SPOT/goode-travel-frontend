import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function PostPage() {
  const { id } = useParams();
  return <PostContainer>{id}</PostContainer>;
}

const PostContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
