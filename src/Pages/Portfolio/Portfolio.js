import PageHeader from "../../Components/PageHeader";
import "./Portfolio.css";
import { SimpleButtonSelect } from "../../Common/StyledAtoms";
import { useEffect, useState } from "react";

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
            <div class='d-flex flex-direction justify-content-around fill'>
                <div class="d-flex flex-column m-5">
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
					Main section
                </div>
            </div>
        </PageHeader>
    );
}

export default PortfolioPage;
