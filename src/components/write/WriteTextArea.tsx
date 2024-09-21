import styled from "styled-components";
import useWriteStore from "../../store/useWriteStore";

interface WriteTextAreaProps {
  placeholder: string;
  itemId?: number; // ItemPost의 경우 id가 필요
}

export default function WriteTextArea({
  placeholder,
  itemId,
}: WriteTextAreaProps) {
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
