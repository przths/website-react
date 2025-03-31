import React from "react";
import ReactGA from "react-ga4";
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
  ABOUT_ME_PAGE_URL
} from "./Common/Constants";
import HomePage from "./Pages/Home/Home";
import PortfolioPage from "./Pages/Portfolio/Portfolio";
import BlogPage from "./Pages/Blog/Blog";
import SingleBlogPage from "./Pages/Blog/SingleBlog";
import ResumePage from "./Pages/Resume/Resume";
import AboutMePage from "./Pages/AboutMe/AboutMe";

function App() {
  useEffect(() => {
    // TODO: Move the code to an .env file (for local and production)
    ReactGA.initialize("G-H7Q3553EDM");
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  window.navigation.addEventListener("navigate", (event) => {
    console.log('location changed!', event.destination.url.split("/").pop());
    ReactGA.send({
      hitType: "pageview",
      page: event.destination.url.split("/").pop(),
    });
  });

  return (
    <BrowserRouter basename={BASELINE_URL}>
      <Routes>
        {[ROOT_PAGE_URL, HOME_PAGE_URL].map((path, index) => 
          <Route path={path} element={<HomePage />} key={index} />
        )}
        <Route path={PORTFOLIO_PAGE_URL} element={<PortfolioPage />} />
        <Route path={BLOG_PAGE_URL} element={<BlogPage />} />
        <Route path={`${BLOG_PAGE_URL}/:slug`} element={<SingleBlogPage />} />
        <Route path={RESUME_PAGE_URL} element={<ResumePage />} />
        <Route path={ABOUT_ME_PAGE_URL} element={<AboutMePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
