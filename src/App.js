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
  PORTFOLIO_DATA_KEY,
  BLOG_SUMMARY_DATA_KEY,
  RESUME_DATA_KEY,
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
import { getBlogData } from "./Common/Api";
import { BLOG_DETAILS_GRAPHQL_QUERY, BLOG_SUMMARY_GRAPHQL_QUERY, PORTFOLIO_DATA_GRAPHQL_QUERY } from "./Common/GraphQLQueries";

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
  const [portfolioData, setPortfolioData] = useState(
    JSON.parse(window.sessionStorage.getItem(PORTFOLIO_DATA_KEY)) || null
  );
  const [blogSummaryData, setBlogSummaryData] = useState(
    JSON.parse(window.sessionStorage.getItem(BLOG_SUMMARY_DATA_KEY)) || null
  )
  const [resumeData, setResumeData] = useState(
    JSON.parse(window.sessionStorage.getItem(RESUME_DATA_KEY)) || null
  )

  useEffect(() => {
    initializeAnalytics();
    const pendingDataFetch = !portfolioData || !blogSummaryData || !resumeData;
    if (pendingDataFetch || window.location.hash === `#${ROOT_PAGE_URL}` || window.location.hash === `#${HOME_PAGE_URL}`) {
      // TODO: rename getBlogData to a generic name
      const portfolioDataCall = getBlogData(PORTFOLIO_DATA_GRAPHQL_QUERY);
      const blogSummaryDataCall = getBlogData(BLOG_SUMMARY_GRAPHQL_QUERY);
      const resumeDataCall = getBlogData(BLOG_DETAILS_GRAPHQL_QUERY, { slug: "my-resume" });
      Promise.all([portfolioDataCall, blogSummaryDataCall, resumeDataCall])
        .then((values) => {
          setPortfolioData(values[0]);
          window.sessionStorage.setItem(PORTFOLIO_DATA_KEY, JSON.stringify(values[0]));
          setBlogSummaryData(values[1]);
          window.sessionStorage.setItem(BLOG_SUMMARY_DATA_KEY, JSON.stringify(values[1]));
          setResumeData(values[2]);
          window.sessionStorage.setItem(RESUME_DATA_KEY, JSON.stringify(values[2]));
        })
        .catch((error) => {
          console.error("Error fetching blog data:", error);
        });
    }
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
                  <PortfolioPage portfolioData={portfolioData} />
                </RouteConfig>
              } 
            />
            <Route 
              path={BLOG_PAGE_URL} 
              element={
                <RouteConfig darkMode={darkMode} setDarkMode={setDarkMode}>
                  <BlogPage blogSummaryData={blogSummaryData} />
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
                  <ResumePage resumeData={resumeData} />
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
