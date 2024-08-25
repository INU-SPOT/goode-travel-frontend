import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import HomePage from "./pages/HomePage";
import CommunityPage from "./pages/CommunityPage";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="/" element={<HomePage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
