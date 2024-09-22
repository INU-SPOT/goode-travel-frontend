import styled from "styled-components";
import { ReplyCommentResponse } from "../../types/comment";
import ProfileImage from "./ProfileImage";

export default function ReplyComment({
  reply,
}: {
  reply: ReplyCommentResponse;
}) {
  return (
    <ReplyWrapper>
      <ProfileImage imageName={reply.profileImageName} />
      <ReplyContent>
        <ReplyHeader>
          <Nickname>{reply.nickname}</Nickname>
          <Date>{reply.date}</Date>
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
  display: flex;
  flex-direction: column;
`;

const ReplyHeader = styled.div`
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

const ReplyText = styled.p`
  margin: 4px 0;
`;
