import styled from "styled-components";
import ReplyContainer from "./ReplyContainer";
import { CommentDetailResponse } from "../../types/comment";
import ProfileImage from "./ProfileImage";

export default function Comment({
  comment,
}: {
  comment: CommentDetailResponse;
}) {
  return (
    <CommentWrapper>
      <ProfileImage imageName={comment.profileImageName} />
      <CommentContent>
        <CommentHeader>
          <Nickname>{comment.nickname}</Nickname>
          <Date>{comment.date}</Date>
        </CommentHeader>
        <CommentText>{comment.content}</CommentText>
        {comment.replyComments.length > 0 && (
          <ReplyContainer replyComments={comment.replyComments} />
        )}
      </CommentContent>
    </CommentWrapper>
  );
}

const CommentWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Nickname = styled.span`
  font-weight: bold;
`;

const Date = styled.span`
  color: #666666;
  font-size: 12px;
`;

const CommentText = styled.p`
  margin: 4px 0;
`;
