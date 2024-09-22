import styled from "styled-components";
import { ReplyCommentResponse } from "../../types/comment";
import ProfileImage from "./ProfileImage";
import CommentDropDown from "./CommentDropDown";

export default function ReplyComment({
  reply,
  fetchCommentDetail,
}: {
  reply: ReplyCommentResponse;
  fetchCommentDetail: () => void;
}) {
  return (
    <ReplyWrapper>
      <ProfileImage imageName={reply.profileImageName} />
      <ReplyContent>
        <ReplyHeader>
          <span>
            <Nickname>{reply.nickname}</Nickname>
            <Date>{reply.date}</Date>
          </span>
          <span>
            <CommentDropDown
              isOwner={reply.isOwner}
              id={reply.replyCommentId}
              content={reply.content}
              type="reply"
              fetchCommentDetail={fetchCommentDetail}
            />
          </span>
        </ReplyHeader>
        <ReplyText>{reply.content}</ReplyText>
      </ReplyContent>
    </ReplyWrapper>
  );
}

const ReplyWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const ReplyContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ReplyHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;

    button {
      background-color: white;
      border: none;
      color: #666666;
      font-size: 14px;
      cursor: pointer;
      &:hover {
        background-color: #f5f5f5;
      }
    }
  }
`;

const Nickname = styled.span`
  font-weight: bold;
`;

const Date = styled.span`
  color: #666666;
  font-size: 12px;
`;

const ReplyText = styled.p`
  margin: 4px 0;
`;
