import styled from "styled-components";

export default function Content({ content }: { content: string }) {
  return <StyledContent>{content}</StyledContent>;
}

const StyledContent = styled.div`
  font-size: 14px;
`;
