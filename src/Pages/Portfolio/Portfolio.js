import "./Portfolio.css";
import "../Blog/Blog.css";
import { Image } from "../../Components/Common/Common";
import { SimpleButtonSelect } from "../../Common/StyledAtoms";
import { useContext, useEffect, useState } from "react";
import { MiniRoundCard } from "../../Components/Common/Common";
import { trackPageView } from "../../Common/Analytics";
import { getSpecialTextColorClass, getThemeColor, isMobileDevice } from "../../Common/Utils";
import { PORTFOLIO_DATA_GRAPHQL_QUERY } from "../../Common/GraphQLQueries";
import { getBlogData } from "../../Common/Api";
import { ColorContext } from "../../Common/Context";
import SubscribeModal from "../../Components/SubscribeModal";

const PortfolioPage = () => {
  const darkMode = useContext(ColorContext);
  const [projects, setProjects] = useState(true);
  const [paintings, setPaintings] = useState(false);
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const handleClose = () => setSubscribe(false);

  useEffect(() => {
    const PAGE_TITLE = "Portfolio";
    document.title = PAGE_TITLE;
    trackPageView(PAGE_TITLE);
    setLoading(true);
    getBlogData(PORTFOLIO_DATA_GRAPHQL_QUERY)
      .then((data) => {
        setLoading(false);
        setPortfolio(data);
      })
      .catch((error) => {
        console.error("Error fetching portfolio data:", error);
      });
  }, []);

  useEffect(() => {
      paintings && setProjects(false) && setSubscribe(false);
  }, [paintings]);

  useEffect(() => {
      projects && setPaintings(false) && setSubscribe(false);
  }, [projects]);

  return (
    <div class={`d-flex portfolio-container justify-content-between mt-4 ${isMobileDevice() ? 'flex-column' : ''}`}>
      <div class={`d-flex flex-column left-panel ${isMobileDevice() ? 'ms-4' : 'mt-3'}`}>
        <h4 class="mb-2" style={getSpecialTextColorClass()}>
          My Portfolio
        </h4>
        <div className={`d-flex ${isMobileDevice() ? 'flex-row' : 'flex-column'}`}>
          <SimpleButtonSelect 
            textColor={darkMode ? '#f9e0d4' : 'black'}
            onClick={() => {
                setProjects(true);
            }}
          >
            { projects ? <strong>Projects</strong> : 'Projects' }
          </SimpleButtonSelect>
          <SimpleButtonSelect
            textColor={darkMode ? '#f9e0d4' : 'black'}
            className={`${isMobileDevice() ? 'ms-2' : ''}`}
            onClick={() => {
                setPaintings(true);
            }}
          >
            { paintings ? <strong>Paintings</strong> : 'Paintings' }
          </SimpleButtonSelect>
          <SimpleButtonSelect
            textColor={darkMode ? '#f9e0d4' : 'black'}
            className={`${isMobileDevice() ? 'ms-2' : ''}`}
            onClick={() => {
                setSubscribe(true);
            }}
          >
            Subscribe
          </SimpleButtonSelect>
          <SubscribeModal show={subscribe} handleClose={handleClose} />
        </div>
      </div>
      <div class="d-flex flex-wrap mx-auto justify-content-between blog-container mt-3 pb-3">
        { loading && 
          <div class="mx-auto">
            <div class="spinner-border" role="status" />
          </div>
        }
        { projects && portfolio?.projects.map((project, index) => {
            return (
              <MiniRoundCard 
                key={index} 
                style={{ 'maxWidth': `${isMobileDevice() ? '90vw' : '26vw'}`}}
                className="m-3"
                backgroundColor={getThemeColor()}
                onClick={() => window.open(project.projectUrl, "_blank")}
              >
                <Image 
                  src={project.projectImage.url} 
                  className="blog-card-img-small loading"
                  width={project.projectImage.width}
                  height={project.projectImage.height}
                />
                <div className="mt-4">
                  <h4 className="mb-2">
                    {project.projectName}
                  </h4>
                  <p>
                    {project.projectDescription}
                  </p>
                  <p class="card-text">
                    <small class="text-muted">
                      <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                        GitHub Link
                      </a>
                    </small>
                  </p>
                </div>
              </MiniRoundCard>
            );
          })
        }
        {
          paintings && 
          <h6 className="m-3 mx-auto">
            Stay tuned for my paintings!
          </h6>
        }
      </div>
    </div>
  );
}

export default PortfolioPage;
