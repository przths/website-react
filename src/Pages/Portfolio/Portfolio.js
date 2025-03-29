import PageHeader from "../../Components/PageHeader";
import "./Portfolio.css";
import { SimpleButtonSelect } from "../../Common/StyledAtoms";
import { useEffect, useState } from "react";
import lockKey from "../../Images/lockkey.png";
import search from "../../Images/mag.png";
import globe from "../../Images/globe.png";
import { CYPHER_IT_PROJECT_DESCRIPTION, PERSONAL_WEBSITE_PROJECT_DESCRIPTION, WEB_CRAWLER_PROJECT_DESCRIPTION } from "../../Common/Content";
import { CYPHER_IT_GITHUB_URL, PERSONAL_WEBSITE_GITHUB_URL, WEB_CRAWLER_GITHUB_URL } from "../../Common/Links";

const ProjectPanel = ({ imageSrc, title, body, href }) => {
    return (
        <div class="card">
            <div class="d-flex justify-content-center">
                <img src={imageSrc} class="col-md-2 my-auto project-img" alt="..."/>
                <div class="col-md-6">
                    <div class="card-body">
                        <h5 class="card-title">{title}</h5>
                        <p class="card-text">{body}</p>
                        <a href={href} target="_blank" class="card-link">GitHub Repository</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

const PortfolioPage = () => {
    const [projects, setProjects] = useState(true);
    const [paintings, setPaintings] = useState(false);

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
                        { projects ? <h5><strong>Projects</strong></h5> : 'Projects' }
                    </SimpleButtonSelect>
                    <SimpleButtonSelect
                        onClick={() => {
                            setPaintings(true);
                        }}
                    >
                        { paintings ? <h5><strong>Paintings</strong></h5> : 'Paintings' }
                    </SimpleButtonSelect>
                </div>
                <div class="mx-auto my-auto text-section align-items-stretch">
                    <ProjectPanel 
                        imageSrc={globe}
                        title="My Website"
                        body={PERSONAL_WEBSITE_PROJECT_DESCRIPTION}
                        href={PERSONAL_WEBSITE_GITHUB_URL}
                    />
                    <ProjectPanel 
                        imageSrc={lockKey}
                        title="Cypher it!"
                        body={CYPHER_IT_PROJECT_DESCRIPTION}
                        href={CYPHER_IT_GITHUB_URL}
                    />
                    <ProjectPanel 
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
