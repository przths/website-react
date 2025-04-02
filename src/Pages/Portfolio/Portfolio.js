import PageHeader from "../../Components/PageHeader";
import "./Portfolio.css";
import { SimpleButtonSelect } from "../../Common/StyledAtoms";
import { useEffect, useState } from "react";
import { RoundCard } from "../../Components/Common/Common";
import { trackPageView } from "../../Common/Analytics";
import { isMobileDevice } from "../../Common/Utils";
import { PORTFOLIO_DATA_GRAPHQL_QUERY } from "../../Common/GraphQL";
import { getBlogData } from "../../Common/Api";

const PortfolioPage = () => {
    const [projects, setProjects] = useState(true);
    const [paintings, setPaintings] = useState(false);
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(false);

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
        paintings && setProjects(false);
    }, [paintings]);

    useEffect(() => {
        projects && setPaintings(false);
    }, [projects]);

    return (
        <PageHeader>
          <div class={`d-flex portfolio-container justify-content-between mt-4 ${isMobileDevice() ? 'flex-column' : ''}`}>
            <div class={`d-flex flex-column left-panel mb-3 ${isMobileDevice() ? 'ms-4' : 'mt-3'}`}>
              <h4 class="mb-2 title-color">
                <strong>
                  My Portfolio
                </strong>
              </h4>
              <div className={`d-flex ${isMobileDevice() ? 'flex-row' : 'flex-column'}`}>
                <SimpleButtonSelect 
                  onClick={() => {
                      setProjects(true);
                  }}
                >
                  { projects ? <strong>Projects</strong> : 'Projects' }
                </SimpleButtonSelect>
                <SimpleButtonSelect
                  className={`${isMobileDevice() ? 'ms-2' : ''}`}
                  onClick={() => {
                      setPaintings(true);
                  }}
                >
                  { paintings ? <strong>Paintings</strong> : 'Paintings' }
                </SimpleButtonSelect>
              </div>
            </div>
            <div class="d-flex flex-wrap mx-auto mb-3 portfolio-card-container">
              { loading && 
                  <div class="mx-auto">
                    <div class="spinner-border" role="status" />
                  </div>
              }
              { portfolio?.projects.map((project, index) => {
                  return (
                    <RoundCard 
                      key={index} 
                      style={{ 'max-width': `${isMobileDevice() ? '90vw' : '26vw'}`}}
                      className="m-3"
                    >
                      <h4 className="mb-4">
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
                    </RoundCard>
                  );
                })
              }
            </div>
          </div>
        </PageHeader>
    );
}

export default PortfolioPage;
