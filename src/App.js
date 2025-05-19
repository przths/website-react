import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { 
  ROOT_PAGE_URL, 
  HOME_PAGE_URL, 
  PORTFOLIO_PAGE_URL, 
  BLOG_PAGE_URL,
  RESUME_PAGE_URL,
  ABOUT_ME_PAGE_URL,
  APPLICATION_DARKMODE_KEY,
  UNSUBSCRIBE_PAGE_URL,
} from "./Common/Constants";
import HomePage from "./Pages/Home/Home";
import PortfolioPage from "./Pages/Portfolio/Portfolio";
import BlogPage from "./Pages/Blog/Blog";
import SingleBlogPage from "./Pages/Blog/SingleBlog";
import AboutMePage from "./Pages/AboutMe/AboutMe";
import { initializeAnalytics } from "./Common/Analytics";
import ResumePage from "./Pages/Resume/Resume";
import { ColorContext } from "./Common/Context";
import PageContainer from "./Components/PageContainer";
import UnsubscribePage from "./Pages/Unsubscribe/Unsubscribe";
import Footer from './Components/Footer/Footer';

const RouteConfig = ({ children, darkMode, setDarkMode }) => 
  <ColorContext.Provider value={darkMode}>
    <PageContainer setDarkMode={setDarkMode}>
      { children }
    </PageContainer>
  </ColorContext.Provider>

function App() {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(window.sessionStorage.getItem(APPLICATION_DARKMODE_KEY)) || false
  );

  useEffect(() => {
    initializeAnalytics()
  }, []);

  useEffect(() => {
    document.getElementsByTagName('body')[0].style.transition = "background-color 0.5s ease";
    if (darkMode) {
      document.getElementsByTagName('body')[0].style.backgroundColor = "#2b3036";
    } else {
      document.getElementsByTagName('body')[0].style.backgroundColor = "#ffffff";
    }
    window.sessionStorage.setItem(APPLICATION_DARKMODE_KEY, darkMode);
  }, [darkMode]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh'
    }}>
      <HashRouter>
        <div style={{ flex: '1 0 auto' }}>
          <Routes>
            {[ROOT_PAGE_URL, HOME_PAGE_URL].map((path, index) => 
              <Route 
                path={path} 
                element={
                  <RouteConfig darkMode={darkMode} setDarkMode={setDarkMode}>
                    <HomePage />
                  </RouteConfig>
                } 
                key={index} />
            )}
            <Route 
              path={PORTFOLIO_PAGE_URL} 
              element={
                <RouteConfig darkMode={darkMode} setDarkMode={setDarkMode}>
                  <PortfolioPage />
                </RouteConfig>
              } 
            />
            <Route 
              path={BLOG_PAGE_URL} 
              element={
                <RouteConfig darkMode={darkMode} setDarkMode={setDarkMode}>
                  <BlogPage />
                </RouteConfig>
              } 
            />
            <Route 
              path={`${BLOG_PAGE_URL}/:slug`} 
              element={
                <RouteConfig darkMode={darkMode} setDarkMode={setDarkMode}>
                  <SingleBlogPage />
                </RouteConfig>
              } 
            />
            <Route 
              path={RESUME_PAGE_URL} 
              element={
                <RouteConfig darkMode={darkMode} setDarkMode={setDarkMode}>
                  <ResumePage />
                </RouteConfig>
              } 
            />
            <Route 
              path={ABOUT_ME_PAGE_URL} 
              element={
                <RouteConfig darkMode={darkMode} setDarkMode={setDarkMode}>
                  <AboutMePage />
                </RouteConfig>
              } 
            />
            <Route 
              path={UNSUBSCRIBE_PAGE_URL} 
              element={
                <RouteConfig darkMode={darkMode} setDarkMode={setDarkMode}>
                  <UnsubscribePage />
                </RouteConfig>
              } 
            />
          </Routes>
        </div>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
