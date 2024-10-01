import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { url: "/", text: "홈" },
    { url: "/save", text: "폴더" },
    { url: "/goode", text: "굳이?" },
    { url: "/community", text: "커뮤니티" },
    { url: "/mypage", text: "마이페이지" },
  ];

  return (
    <NavbarContainer>
      {navItems.map((item, index) => (
        <NavItem
          key={index}
          onClick={() => navigate(item.url)}
          isActive={location.pathname === item.url}
        >
          {item.text}
        </NavItem>
      ))}
    </NavbarContainer>
  );
}

const NavbarContainer = styled.nav`
  position: fixed;
  bottom: 0;
  max-width: 480px;
  width: 100%;
  height: 68px;
  background-color: white;
  box-shadow: 0px -4px 6px 0px #3030301a;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 1000;
`;

const NavItem = styled.div<{ isActive: boolean }>`
  flex: 1;
  display: flex;
  justify-content: center;
  font-size: 14px;
  color: ${(props) =>
    props.isActive ? "#007bff" : "#000"}; /* 활성화된 항목 색상 */
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
  cursor: pointer;

  &:hover {
    color: #007bff;
  }
`;
