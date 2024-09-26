import styled from "styled-components";
import { ReactComponent as XIcon } from "../../assets/icons/x-icon.svg";
import { useNavigate } from "react-router-dom";

export default function PostHeader({
  postId,
  isOwner,
}: {
  postId: number;
  isOwner: boolean;
}) {
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <div>
        <StyledXIcon onClick={() => navigate("/community")} />
      </div>
      <div>
        {isOwner && (
          <>
            <button
              onClick={() => {
                navigate(`/edit/${postId}`);
              }}
            >
              수정
            </button>
            <button
              onClick={() => {
                /* TODO: id 이용 이동 기능 */
              }}
              className="delete"
            >
              삭제
            </button>
          </>
        )}
      </div>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    gap: 16px;
    align-items: center;
  }
  button {
    background-color: #abe5e3;
    min-width: 64px;
    height: 32px;
    color: white;
    border: none;
    border-radius: 20px;
    font-weight: bold;
  }
  .delete {
    background-color: #ff0000;
  }
`;

const StyledXIcon = styled(XIcon)`
  width: 12px;
  height: 12px;
`;
