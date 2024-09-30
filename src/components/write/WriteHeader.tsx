import styled from "styled-components";
import { ReactComponent as XIcon } from "../../assets/icons/x-icon.svg";
import { useNavigate } from "react-router-dom";
import { post_posts, patch_posts } from "../../services/post";
import useWriteStore from "../../store/useWriteStore";

export default function WriteHeader({
  saveData,
  resetWriteState,
  storageKey,
  isEditMode,
  postId,
}: {
  saveData?: () => void;
  resetWriteState: () => void;
  storageKey: string;
  isEditMode: boolean;
  postId?: number; // 수정 모드일 때 postId
}) {
  const navigate = useNavigate();
  const { title, firstContent, lastContent, startDate, endDate, itemPosts } =
    useWriteStore();

  const handleSubmit = async () => {
    const postData = {
      title,
      firstContent,
      lastContent,
      startDate,
      endDate,
      itemPosts,
    };

    try {
      if (isEditMode && postId) {
        // 수정 모드일 경우 patch_posts 호출
        await patch_posts(postId, postData);
        alert("게시글이 성공적으로 수정되었습니다.");
        navigate(`/community?postId=${postId}`);
      } else {
        // 새로운 글 작성 모드일 경우 post_posts 호출
        await post_posts(postData);
        alert("게시글이 성공적으로 등록되었습니다.");
        resetWriteState();
        localStorage.removeItem(storageKey);
        navigate("/community");
      }
    } catch (error) {
      console.error(
        isEditMode ? "게시글 수정 실패:" : "게시글 등록 실패:",
        error
      );
      alert(
        isEditMode
          ? "게시글 수정에 실패했습니다."
          : "게시글 등록에 실패했습니다."
      );
    }
  };

  const handleCancel = () => {
    if (isEditMode && postId) {
      navigate(-1);
    } else {
      navigate("/community");
    }
  };

  return (
    <StyledHeader>
      <div>
        <StyledXIcon onClick={handleCancel} />
        <p>
          {isEditMode ? "굳이? 커뮤니티 글 수정" : "굳이? 커뮤니티 글 작성"}
        </p>
      </div>
      <div>
        {!isEditMode && saveData && (
          <button onClick={saveData}>임시 저장</button>
        )}
        <button onClick={handleSubmit}>
          {isEditMode ? "수정 완료" : "완료"}
        </button>
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
`;

const StyledXIcon = styled(XIcon)`
  width: 12px;
  height: 12px;
`;
