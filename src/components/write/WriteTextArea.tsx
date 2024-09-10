import styled from "styled-components";
import useWriteStore from "../../store/useWriteStore";

interface WriteTextAreaProps {
  placeholder: string;
  id?: number; // ItemPost의 경우 id가 필요
}

export default function WriteTextArea({ placeholder, id }: WriteTextAreaProps) {
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
    if (id !== undefined) {
      const item = state.ItemPosts.find((item) => item.id === id);
      return {
        content: item ? item.content : "",
        setContent: (newContent: string) => state.updateContent(id, newContent),
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
