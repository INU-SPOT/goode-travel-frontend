import styled from "styled-components";

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
      <img
        src={`${process.env.REACT_APP_IMAGE_URL}/${writerImageName}`}
        alt={`${writerId}`}
      />
      <span>by {writerNickname}</span>
    </StyledWriter>
  );
}

const StyledWriter = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  img {
    width: 36px;
    height: 36px;
    border-radius: 4px;
  }
  span {
    font-size: 14px;
    color: #666666;
  }
`;
