import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";

export default function MainPage() {
  return (
    <MainPageWrapper>
      <Outlet></Outlet>
      <Navbar />
    </MainPageWrapper>
  );
}

const MainPageWrapper = styled.div``;
