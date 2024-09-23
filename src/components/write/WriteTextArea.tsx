import styled from "styled-components";
import useWriteStore from "../../store/useWriteStore";
import { useEffect, useRef } from "react";

interface WriteTextAreaProps {
  placeholder: string;
  itemId?: number; // ItemPost의 경우 id가 필요
}

export default function WriteTextArea({
  placeholder,
  itemId,
}: WriteTextAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // 내용에 따라 높이를 자동으로 조정하는 함수
      const resizeTextarea = () => {
        textarea.style.height = "auto"; // 높이를 자동으로 조정하기 위해 초기화
        textarea.style.height = `${textarea.scrollHeight}px`; // 내용을 기준으로 높이를 설정
      };

      // 처음 렌더링될 때와 입력될 때마다 높이 조정
      textarea.addEventListener("input", resizeTextarea);
      resizeTextarea(); // 처음 렌더링 시 호출

      return () => {
        textarea.removeEventListener("input", resizeTextarea);
      };
    }
  }, []);

  // placeholder에 따라 content와 setContent를 결정
  const { content, setContent } = useWriteStore((state) => {
    if (placeholder === "전반적인 여행에 대해 소개해 주세요.") {
      return {
        content: state.firstContent,
        setContent: (newContent: string) => state.setFirstContent(newContent),
      };
    }
    if (placeholder === "글을 마무리하는 인사말을 적어주세요.") {
      return {
        content: state.lastContent,
        setContent: (newContent: string) => state.setLastContent(newContent),
      };
    }
    if (itemId !== undefined) {
      const item = state.itemPosts.find((item) => item.itemId === itemId);
      return {
        content: item ? item.content : "",
        setContent: (newContent: string) =>
          state.updateContent(itemId, newContent),
      };
    }
    return { content: "", setContent: () => {} }; // 기본값
  });

  return (
    <StyledWriteTextArea
      ref={textareaRef}
      value={content}
      onChange={(e) => setContent(e.target.value)}
      placeholder={placeholder}
    />
  );
}

const StyledWriteTextArea = styled.textarea`
  border: none;
  outline: none;
  font-size: 14px;
  overflow: hidden;
  resize: none;
  &::placeholder {
    color: #aaa;
  }
`;
