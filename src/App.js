import React, { useState } from "react";
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { 
  ROOT_PAGE_URL, 
  HOME_PAGE_URL, 
  PORTFOLIO_PAGE_URL, 
  BLOG_PAGE_URL,
  RESUME_PAGE_URL,
  BASELINE_URL,
  ABOUT_ME_PAGE_URL,
} from "./Common/Constants";
import HomePage from "./Pages/Home/Home";
import PortfolioPage from "./Pages/Portfolio/Portfolio";
import BlogPage from "./Pages/Blog/Blog";
import SingleBlogPage from "./Pages/Blog/SingleBlog";
import AboutMePage from "./Pages/AboutMe/AboutMe";
import { initializeAnalytics } from "./Common/Analytics";
import ResumePage from "./Pages/Resume/Resume";
import { getRandomBackgroundColor } from "./Common/Utils";
import { ColorContext } from "./Common/Context";

function App() {
  const [backgroundColor] = useState(getRandomBackgroundColor());
  
  useEffect(() => {
    initializeAnalytics()
  }, []);

  return (
    <BrowserRouter basename={BASELINE_URL}>
      <Routes>
        {[ROOT_PAGE_URL, HOME_PAGE_URL].map((path, index) => 
          <Route 
            path={path} 
            element={
              <ColorContext.Provider value={backgroundColor}>
                <HomePage />
              </ColorContext.Provider>
            } 
            key={index} />
        )}
        <Route 
          path={PORTFOLIO_PAGE_URL} 
          element={
            <ColorContext.Provider value={backgroundColor}>
              <PortfolioPage />
            </ColorContext.Provider>
          } 
        />
        <Route 
          path={BLOG_PAGE_URL} 
          element={
            <ColorContext.Provider value={backgroundColor}>
              <BlogPage />
            </ColorContext.Provider>
          } 
        />
        <Route 
          path={`${BLOG_PAGE_URL}/:slug`} 
          element={<SingleBlogPage />} 
        />
        <Route 
          path={RESUME_PAGE_URL} 
          element={<ResumePage />} 
        />
        <Route 
          path={ABOUT_ME_PAGE_URL} 
          element={<AboutMePage />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
