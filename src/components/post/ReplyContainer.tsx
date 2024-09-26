import styled from "styled-components";
import ReplyComment from "./ReplyComment";
import { ReplyCommentResponse } from "../../types/comment";

export default function ReplyContainer({
  replyComments,
  fetchCommentDetail,
}: {
  replyComments: ReplyCommentResponse[];
  fetchCommentDetail: () => void;
}) {
  return (
    <ReplyWrapper>
      {replyComments.map((reply) => (
        <ReplyComment
          key={reply.replyCommentId}
          reply={reply}
          fetchCommentDetail={fetchCommentDetail}
        />
      ))}
    </ReplyWrapper>
  );
}

const ReplyWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
