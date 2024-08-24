import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();
  return (
    <MainPageWrapper>
      <Outlet></Outlet>
      <div onClick={() => navigate("/")}>홈 자리임 ㅋㅋ</div>
      <div onClick={() => navigate("/community")}>커뮤니티 자리임 ㅋㅋ</div>
      <div onClick={() => navigate("/mypage")}>마이페이지 자리임 ㅋㅋ</div>
    </MainPageWrapper>
  );
}

const MainPageWrapper = styled.div``;
