import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import HomePage from "./pages/HomePage";
import CommunityPage from "./pages/CommunityPage";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";
import useAuth from "./hooks/useAuth";
import ScrollDetector from "./components/ScrollDetector";
import RandomGoodePage from "./pages/RandomGoodePage";
import WritePage from "./pages/WritePage";
import PostPage from "./pages/PostPage";
import FolderPage from "./pages/FolderPage";

function App() {
  useAuth();

  return (
    <Router>
      <ScrollDetector />
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="/" element={<HomePage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="random-goode" element={<RandomGoodePage />} />
          <Route path="save" element={<FolderPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="write" element={<WritePage />} />
        <Route path="edit/:id" element={<WritePage />} />
        <Route path="post/:id" element={<PostPage />} />
      </Routes>
    </Router>
  );
}

export default App;
