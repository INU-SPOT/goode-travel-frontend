import styled from "styled-components";
import ArrowUpIcon from "../../assets/icons/arrow-up-icon.svg";
import { useState } from "react";
import { post_posts_comments } from "../../services/comment";
import { useNavigate } from "react-router-dom";

export default function CommentInput({
  postId,
  onCommentSubmit,
}: {
  postId: number;
  onCommentSubmit: () => void;
}) {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

  const handleSubmit = async () => {
    if (content.trim() === "" || isSubmitting) return;

    setIsSubmitting(true);

    try {
      await post_posts_comments(postId, content);
      setContent(""); // 입력 필드 비우기
      onCommentSubmit(); // 콜백 호출로 댓글 목록 갱신
    } catch (error) {
      console.error("Failed to post comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StyledCommentInput>
      <div>
        {accessToken ? (
          <>
            <input
              placeholder="매너있는 댓글을 작성해주세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={handleSubmit} disabled={isSubmitting}>
              <img src={ArrowUpIcon} alt="Send" />
            </button>
          </>
        ) : (
          <span
            onClick={() => {
              navigate("/login");
            }}
          >
            댓글을 작성하려면 로그인 해주세요.
          </span>
        )}
      </div>
    </StyledCommentInput>
  );
}

const StyledCommentInput = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100svw;
  min-height: 68px;
  background-color: white;
  display: flex;
  justify-content: center;
  z-index: 1000;

  div {
    width: 90%;
    max-width: 432px;
    min-height: 56px;
    padding: 0 16px;
    margin-bottom: 12px;
    box-shadow: 0px 2px 8px 0px #0000001a;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
    background-color: white;

    input {
      flex: 1;
      font-size: 14px;
      border: none;
      outline: none;
      &::placeholder {
        color: #404040;
      }
    }

    button {
      height: 44px;
      width: 44px;
      background-color: black;
      border-radius: 12px;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 16px;
        height: 16px;
      }

      &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }
    }

    span {
      font-size: 14px;
      text-decoration: underline;
    }
  }
`;
