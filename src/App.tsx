import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CommunityPage from "./pages/CommunityPage";
import MyPage from "./pages/MyPage";
import HomePage from "./pages/HomePage";
// import ProfilePage from './pages/ProfilePage';
// import SettingsPage from './pages/SettingsPage';
// import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<MainPage />}>
          {/* MainPage의 하위 라우트 */}
          <Route path="/" element={<HomePage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
