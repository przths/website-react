import PageHeader from "../../Components/PageHeader";
import "./Portfolio.css";
import { SimpleButtonSelect } from "../../Common/StyledAtoms";
import { useEffect, useState } from "react";
import cloudMe from "../../Images/cloudme.png";
import key from "../../Images/key.png";

const ProjectPanel = ({ imageSrc, title, body, footer }) => {
    return (
        <div class="card mb-5">
            <div class="row g-0">
                <div class="col-md-3">
                    <img src={imageSrc} class="project-img img-fluid rounded-start" alt="..."/>
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{title}</h5>
                    <p class="card-text">{body}</p>
                    <p class="card-text"><small class="text-muted">{footer}</small></p>
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
                <div class="d-flex flex-column">
                    <h5 class="mb-2 title-color">
                        <strong>
                            My Portfolio
                        </strong>
                    </h5>
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
                    <ProjectPanel 
                        imageSrc={key}
                        title="Cypher it!"
                        body="This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer."
                        footer="Last updated 3 mins ago"
                    />
                </div>
            </div>
        </PageHeader>
    );
}

export default PortfolioPage;
