import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import ArticleRead from "./pages/ArticleRead";
import AboutPage from "./pages/AboutPage";
import Header from "./components/Header";
import Quiz from "./components/Quiz";
import ForgotPass from "./components/ForgotPass";
import ProfilePage from "./pages/ProfilePage";
import FooterComp from "./components/FooterComp";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Routes>
        <Route path="/fgpass" element={<ForgotPass />} />
      </Routes>
      <Routes>
        <Route path="/fgquiz" element={<Quiz />} />
      </Routes>
      <Routes>
        <Route path="/login" element={} />
      </Routes>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Routes>
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Routes>
        <Route path="/article" element={<ArticleRead />} />
      </Routes>
      <FooterComp />
    </>
  );
}

export default App;
