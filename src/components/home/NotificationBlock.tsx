import styled from "styled-components";
import { COLOR } from "../../utils/color";

export default function Notification() {
  return (
    <NotificationWrapper>
      <MainText>님이 댓글을 달았어요.</MainText>
    </NotificationWrapper>
  );
}

const NotificationWrapper = styled.div`
  width: 100%;
  height: 40px;
`;

const MainText = styled.div`
  font-size: 15px;
`;
