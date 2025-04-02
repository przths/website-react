import PageHeader from "../../Components/PageHeader";
import "./Portfolio.css";
import ReactGA from "react-ga4";
import { SimpleButtonSelect } from "../../Common/StyledAtoms";
import { useEffect, useState } from "react";
import lockKey from "../../Images/lockkey.png";
import search from "../../Images/mag.png";
import globe from "../../Images/globe.png";
import { Card } from "../../Components/Common/Common";
import { CYPHER_IT_PROJECT_DESCRIPTION, PERSONAL_WEBSITE_PROJECT_DESCRIPTION, WEB_CRAWLER_PROJECT_DESCRIPTION } from "../../Common/Content";
import { CYPHER_IT_GITHUB_URL, PERSONAL_WEBSITE_GITHUB_URL, WEB_CRAWLER_GITHUB_URL } from "../../Common/Links";
import { trackPageView } from "../../Common/Analytics";

const PortfolioPage = () => {
    const [projects, setProjects] = useState(true);
    const [paintings, setPaintings] = useState(false);

    useEffect(() => {
      const PAGE_TITLE = "Portfolio";
      document.title = PAGE_TITLE;
      trackPageView(PAGE_TITLE);
    }, []);

    useEffect(() => {
        paintings && setProjects(false);
    }, [paintings]);

    useEffect(() => {
        projects && setPaintings(false);
    }, [projects]);

    return (
        <PageHeader>
            <div class='d-flex flex-direction justify-content-around fill m-5'>
                <div class="d-flex flex-column left-panel">
                    <h4 class="mb-2 title-color">
                        <strong>
                            My Portfolio
                        </strong>
                    </h4>
                    <SimpleButtonSelect 
                        onClick={() => {
                            setProjects(true);
                        }}
                    >
                        { projects ? <strong>Projects</strong> : 'Projects' }
                    </SimpleButtonSelect>
                    <SimpleButtonSelect
                        onClick={() => {
                            setPaintings(true);
                        }}
                    >
                        { paintings ? <strong>Paintings</strong> : 'Paintings' }
                    </SimpleButtonSelect>
                </div>
                <div class="mx-auto my-auto text-section align-items-stretch">
                    <Card 
                        imageSrc={globe}
                        title="My Website"
                        body={PERSONAL_WEBSITE_PROJECT_DESCRIPTION}
                        href={PERSONAL_WEBSITE_GITHUB_URL}
                    />
                    <Card 
                        imageSrc={lockKey}
                        title="Cypher it!"
                        body={CYPHER_IT_PROJECT_DESCRIPTION}
                        href={CYPHER_IT_GITHUB_URL}
                    />
                    <Card 
                        imageSrc={search}
                        title="Web Crawler"
                        body={WEB_CRAWLER_PROJECT_DESCRIPTION}
                        href={WEB_CRAWLER_GITHUB_URL}
                    />
                </div>
            </div>
        </PageHeader>
    );
}

export default PortfolioPage;
