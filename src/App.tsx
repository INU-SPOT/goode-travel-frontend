import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import HomePage from "./pages/HomePage";
import GoodePage from "./pages/GoodePage";
import CommunityPage from "./pages/CommunityPage";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";
import useAuth from "./hooks/useAuth";
import ScrollDetector from "./components/ScrollDetector";
import RandomGoodePage from "./pages/RandomGoodePage";
import WritePage from "./pages/WritePage";
import PostPage from "./pages/PostPage";
import FolderPage from "./pages/FolderPage";
import FolderDetail from "./components/folder/FolderDetail";
import GoodeSheet from "./components/goode/GoodeSheet";
import CourseSheet from "./components/goode/CourseSheet";

function QueryContent() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const itemId = params.get("itemId");
  const courseId = params.get("courseId");

  return (
    <>
      <GoodeSheet itemId={itemId} />
      <CourseSheet courseId={courseId} />
    </>
  );
}

function App() {
  useAuth();

  return (
    <Router>
      <ScrollDetector />
      <QueryContent />
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="/" element={<HomePage />} />
          <Route path="goode" element={<GoodePage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="random-goode" element={<RandomGoodePage />} />
          <Route path="save" element={<FolderPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="write" element={<WritePage />} />
        <Route path="edit/:id" element={<WritePage />} />
        <Route path="post/:id" element={<PostPage />} />
        <Route path="save/:folderId" element={<FolderDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
