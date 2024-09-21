import styled from "styled-components";

export default function TitleInput({
  title,
  createDate,
}: {
  title: string;
  createDate: string;
}) {
  return (
    <Container>
      <StyledTitle>{title}</StyledTitle>
      <StyledDate>{createDate}</StyledDate>
    </Container>
  );
}

const Container = styled.div`
  padding-bottom: 12px;
  border-bottom: 2px solid #666666;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const StyledDate = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #666666;
`;
