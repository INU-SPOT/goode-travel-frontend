import styled from "styled-components";
import { ReactComponent as HeartIconSVG } from "../assets/icons/heart-icon.svg";
import { ReactComponent as CommentIconSVG } from "../assets/icons/comment-icon.svg";

interface PostCardProps {
  title: string;
  subTitles: string[];
  likes: number;
  comments: number;
  author: string;
  thumbnail: string;
}

export default function PostCard({
  title,
  subTitles,
  likes,
  comments,
  author,
  thumbnail,
}: PostCardProps) {
  return (
    <StyledPostCard>
      <PostContent>
        <TitleWrapper>
          <Title>{title}</Title>
          {subTitles &&
            subTitles.map((subtitle, index) => (
              <Subtitle key={index}>- {subtitle}</Subtitle>
            ))}
        </TitleWrapper>
        <PostFooter>
          <IconsWrapper>
            <IconWrapper>
              <HeartIcon />
              <Count>{likes}</Count>
            </IconWrapper>
            <IconWrapper>
              <CommentIcon />
              <Count>{comments}</Count>
            </IconWrapper>
          </IconsWrapper>
          <Author>by {author}</Author>
        </PostFooter>
      </PostContent>
      <Thumbnail src={thumbnail} alt={`${title} 썸네일`} />
    </StyledPostCard>
  );
}

const StyledPostCard = styled.div`
  display: flex;
  padding: 16px;
  min-height: 160px;
  border-radius: 8px;
  box-shadow: 0px 2px 8px 0px #0000001a;
  margin: 0 24px;
  background-color: white;
`;

const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
`;

const PostContent = styled.div`
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
