import styled from "styled-components";
import ReplyContainer from "./ReplyContainer";
import { CommentDetailResponse } from "../../types/comment";
import ProfileImage from "./ProfileImage";
import CommentDropDown from "./CommentDropDown";

export default function Comment({
  comment,
  fetchCommentDetail,
  setReplyTo,
}: {
  comment: CommentDetailResponse;
  fetchCommentDetail: () => void;
  setReplyTo: ({
    nickname,
    commentId,
  }: {
    nickname: string | null;
    commentId: number | null;
  }) => void;
}) {
  return (
    <CommentWrapper>
      <ProfileImage imageName={comment.profileImageName} />
      <CommentContent>
        <CommentHeader>
          <span>
            <Nickname>{comment.nickname}</Nickname>
            <Date>{comment.date}</Date>
          </span>
          <span>
            <button
              onClick={() =>
                setReplyTo({
                  nickname: comment.nickname,
                  commentId: comment.commentId,
                })
              }
            >
              답글
            </button>
            <CommentDropDown
              isOwner={comment.isOwner}
              id={comment.commentId}
              content={comment.content}
              type="comment"
              fetchCommentDetail={fetchCommentDetail}
            />
          </span>
        </CommentHeader>
        <CommentText>{comment.content}</CommentText>
        {comment.replyComments.length > 0 && (
          <ReplyContainer
            replyComments={comment.replyComments}
            fetchCommentDetail={fetchCommentDetail}
          />
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
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CommentHeader = styled.div`
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

const CommentText = styled.p`
  margin: 4px 0;
`;
