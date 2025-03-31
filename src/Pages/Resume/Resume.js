import PageHeader from "../../Components/PageHeader";
import { useEffect } from "react";

const ResumePage = () => {
    useEffect(() => {
        document.title = "Resume";
    }, []);
    
    return (
        <PageHeader>
            <div>
                Resume Page
            </div>
        </PageHeader>
    );
}

export default ResumePage;
