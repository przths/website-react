import ReactGA from "react-ga4";
import { useEffect } from "react";
import PageHeader from "../../Components/PageHeader";

const ResumePage = () => {
    useEffect(() => {
      const PAGE_TITLE = "Resume";
      document.title = PAGE_TITLE;
      ReactGA.send({
        hitType: "pageview",
        page: PAGE_TITLE,
      });
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
