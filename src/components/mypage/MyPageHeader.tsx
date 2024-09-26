import styled from "styled-components";

export default function MyPageHeader() {
  return (
    <StyledHeader>
      <h2>마이페이지</h2>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  height: 72px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h2 {
    margin: 0;
  }
  background-color: #abe5e3;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
`;
