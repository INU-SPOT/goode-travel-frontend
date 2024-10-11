import styled from "styled-components";
import { ReactComponent as CommentIconSVG } from "../../assets/icons/comment-icon.svg";
import { UserCommentResponse } from "../../types/comment";
import { useLocation, useNavigate } from "react-router-dom";

function CommentCard({ comment }: { comment: UserCommentResponse }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigateWithQuery = () => {
    const params = new URLSearchParams(location.search);
    params.set("postId", String(comment.postId) || "");
    const newUrl = `${location.pathname}?${params.toString()}`;
    navigate(newUrl);
  };

  return (
    <StyledCommentCard onClick={handleNavigateWithQuery}>
      <TitleWrapper>
        <h4>{comment.postTitle}</h4>
        <p>{comment.date}</p>
      </TitleWrapper>
      <ContentWrapper>
        <CommentIcon />
        <Content>
          {comment.content} <span>{comment.isModified && "(수정됨)"}</span>
        </Content>
      </ContentWrapper>
    </StyledCommentCard>
  );
}

const StyledCommentCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  min-height: 80px;
  border-radius: 8px;
  box-shadow: 0px 2px 8px 0px #0000001a;
  background-color: white;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h4 {
    margin: 0;
    white-space: nowrap; /* 한 줄로 표시 */
    overflow: hidden; /* 넘치는 부분 숨기기 */
    text-overflow: ellipsis; /* 넘치는 부분에 '...' 표시 */
  }
  p {
    min-width: 80px;
    margin: 0;
    font-size: 12px;
    color: #666;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const CommentIcon = styled(CommentIconSVG)`
  width: 16px;
  height: 16px;
`;

const Content = styled.div`
  flex: 1;
  color: #666;
  font-size: 14px;
  white-space: nowrap; /* 한 줄로 표시 */
  overflow: hidden; /* 넘치는 부분 숨기기 */
  text-overflow: ellipsis; /* 넘치는 부분에 '...' 표시 */
  span {
    color: black;
  }
`;

export default function CommentList({
  comments,
}: {
  comments: UserCommentResponse[];
}) {
  return (
    <StyledCommentList>
      {comments.length === 0 ? (
        <NoCommentsMessage>작성한 댓글이 없습니다.</NoCommentsMessage>
      ) : (
        comments.map((comment, index) => (
          <CommentCard key={index} comment={comment} />
        ))
      )}
    </StyledCommentList>
  );
}

const StyledCommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 24px 0 24px;
`;

const NoCommentsMessage = styled.div`
  text-align: center;
  color: #666;
  font-size: 14px;
  padding: 24px;
`;
