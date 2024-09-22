import styled from "styled-components";
import ProfileImage from "./ProfileImage";

export default function Writer({
  writerId,
  writerNickname,
  writerImageName,
}: {
  writerId: number;
  writerNickname: string;
  writerImageName: string;
}) {
  return (
    <StyledWriter
      onClick={() => {
        /* TODO: writerId 이용 페이지 이동 */
      }}
    >
      <ProfileImage imageName={writerImageName} />
      <span>by {writerNickname}</span>
    </StyledWriter>
  );
}

const StyledWriter = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  span {
    font-size: 14px;
    color: #666666;
  }
`;
