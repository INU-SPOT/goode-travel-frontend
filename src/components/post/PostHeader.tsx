import styled from "styled-components";
import { ReactComponent as XIcon } from "../../assets/icons/x-icon.svg";
import { useNavigate } from "react-router-dom";
import { delete_posts_postid } from "../../services/post";

export default function PostHeader({
  postId,
  isOwner,
}: {
  postId: number;
  isOwner: boolean;
}) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "정말로 이 게시글을 삭제하시겠습니까?"
    );
    if (confirmDelete) {
      try {
        await delete_posts_postid(postId);
        alert("게시글이 삭제되었습니다.");
        navigate(-1); // 이전 페이지로 이동
      } catch (error) {
        console.error("게시글 삭제 중 오류 발생:", error);
        alert("게시글 삭제에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

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
                handleDelete();
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
