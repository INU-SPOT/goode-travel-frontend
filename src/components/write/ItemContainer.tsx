import styled from "styled-components";
import { ReactComponent as MinusIcon } from "../../assets/icons/minus-icon.svg";
import WriteTextArea from "./WriteTextArea";

interface ItemContainerProps {
  id: number;
  title: string;
  content: string;
  updateContent: (id: number, content: string) => void;
  removeItemPost: (id: number) => void;
  dragListeners: any; // 드래그 핸들러 리스너
}

export default function ItemContainer({
  id,
  title,
  content,
  updateContent,
  removeItemPost,
  dragListeners,
}: ItemContainerProps) {
  const handleDelete = () => {
    removeItemPost(id);
  };

  return (
    <StyledItemContainer>
      <TitleWrapper>
        {/* 드래그 핸들로 사용될 부분 */}
        <span {...dragListeners} style={{ cursor: "grab" }}>
          {title}
        </span>
        <StyledMinusIcon onClick={handleDelete} />
      </TitleWrapper>
      <WriteTextArea
        value={content}
        onChange={(newValue) => updateContent(id, newValue)}
        placeholder="일정에 대해 소개해 주세요."
      />
    </StyledItemContainer>
  );
}

const StyledItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 2px 8px 0px #0000001a;
  background-color: white;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    font-size: 16px;
    font-weight: bold;
  }
`;

const StyledMinusIcon = styled(MinusIcon)`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;
