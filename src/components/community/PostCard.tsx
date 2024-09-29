import styled from "styled-components";
import { ReactComponent as HeartIconSVG } from "../../assets/icons/heart-icon.svg";
import { ReactComponent as CommentIconSVG } from "../../assets/icons/comment-icon.svg";
import { PostThumbnailResponse } from "../../types/post";
import { useLocation, useNavigate } from "react-router-dom";

interface PostCardProps {
  post: PostThumbnailResponse;
}

export default function PostCard({ post }: PostCardProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigateWithQuery = () => {
    const params = new URLSearchParams(location.search);
    params.set("postId", String(post.postId) || "");
    const newUrl = `${location.pathname}?${params.toString()}`;
    navigate(newUrl);
  };

  return (
    <StyledPostCard onClick={handleNavigateWithQuery}>
      <PostContent>
        <TitleWrapper>
          <Title>{post.title}</Title>
          {post.items &&
            post.items.map((item, index) => (
              <Subtitle key={index}>- {item.itemTitle}</Subtitle>
            ))}
        </TitleWrapper>
        <PostFooter>
          <IconsWrapper>
            <IconWrapper>
              <HeartIcon />
              <Count>{post.likeNum}</Count>
            </IconWrapper>
            <IconWrapper>
              <CommentIcon />
              <Count>{post.commentNum}</Count>
            </IconWrapper>
          </IconsWrapper>
          <Author>by {post.writerNickname}</Author>
        </PostFooter>
      </PostContent>
      <Thumbnail
        src={`${process.env.REACT_APP_IMAGE_URL}/${post.imageName}`}
        alt={`${post.title} 썸네일`}
      />
    </StyledPostCard>
  );
}

const StyledPostCard = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  min-height: 160px;
  border-radius: 8px;
  box-shadow: 0px 2px 8px 0px #0000001a;
  background-color: white;
`;

const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
`;

const PostContent = styled.div`
  max-width: 68%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  flex-grow: 1;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.h3`
  margin: 0;
`;

const Subtitle = styled.div`
  color: #666;
  font-size: 14px;
`;

const PostFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Count = styled.span`
  font-size: 12px;
  font-weight: 600;
`;

const HeartIcon = styled(HeartIconSVG)`
  width: 12px;
  height: 12px;
`;

const CommentIcon = styled(CommentIconSVG)`
  width: 12px;
  height: 12px;
`;

const Author = styled.div`
  font-size: 14px;
  color: #666666;
`;
