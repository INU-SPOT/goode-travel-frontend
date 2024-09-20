import styled from "styled-components";
import { ReactComponent as XIcon } from "../../assets/icons/x-icon.svg";
import { useNavigate } from "react-router-dom";
import { post_posts } from "../../services/post";
import useWriteStore from "../../store/useWriteStore";
import TemporarySave from "./TemporarySave";

export default function WriteHeader() {
  const storageKey = "writePageTemporarySaveData";
  const navigate = useNavigate();
  const {
    title,
    firstContent,
    lastContent,
    startDate,
    endDate,
    itemPosts,
    setTitle,
    setFirstContent,
    setLastContent,
    setStartDate,
    setEndDate,
    clearItemPosts,
  } = useWriteStore();

  const resetWriteState = () => {
    setTitle("");
    setFirstContent("");
    setLastContent("");
    setStartDate("");
    setEndDate("");
    clearItemPosts();
  };

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
      await post_posts(postData);
      alert("게시글이 성공적으로 등록되었습니다.");
      resetWriteState();
      localStorage.removeItem(storageKey);
      navigate("/community");
    } catch (error) {
      console.error("게시글 등록 실패:", error);
      alert("게시글 등록에 실패했습니다.");
    }
  };

  return (
    <StyledHeader>
      <div>
        <StyledXIcon onClick={() => navigate(-1)} />
        <p>굳이? 커뮤니티 글 작성</p>
      </div>
      <div>
        <TemporarySave
          storageKey={storageKey}
          resetWriteState={resetWriteState}
        />
        <button onClick={handleSubmit}>완료</button>
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
