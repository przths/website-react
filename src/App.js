import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { 
  ROOT_PAGE_URL, 
  HOME_PAGE_URL, 
  PORTFOLIO_PAGE_URL, 
  BLOG_PAGE_URL,
  RESUME_PAGE_URL
} from "./Common/Constants";
import HomePage from "./Pages/Home/Home";
import PortfolioPage from "./Pages/Portfolio/Portfolio";
import BlogPage from "./Pages/Blog/Blog";
import SingleBlogPage from "./Pages/Blog/SingleBlog";
import ResumePage from "./Pages/Resume/Resume";

function App() {
  return (
    <BrowserRouter basename="/website-react">
      <Routes>
        {[ROOT_PAGE_URL, HOME_PAGE_URL].map((path, index) => 
          <Route path={path} element={<HomePage/>} key={index} />
        )}
        <Route path={PORTFOLIO_PAGE_URL} element={<PortfolioPage/>} />
        <Route path={BLOG_PAGE_URL} element={<BlogPage/>}/>
        <Route path={`${BLOG_PAGE_URL}/:slug`} element={<SingleBlogPage/>}/>
        <Route path={RESUME_PAGE_URL} element={<ResumePage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
