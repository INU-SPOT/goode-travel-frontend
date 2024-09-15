import styled from "styled-components";
import { ReactComponent as XIcon } from "../../assets/icons/x-icon.svg";
import { useNavigate } from "react-router-dom";
import TemporarySave from "./TemporarySave";

export default function WriteHeader() {
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <div>
        <StyledXIcon onClick={() => navigate(-1)} />
        <p>굳이? 커뮤니티 글 작성</p>
      </div>
      <div>
        <TemporarySave />
        <button>완료</button>
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
    width: 64px;
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
