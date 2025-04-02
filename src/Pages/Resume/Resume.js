import { useEffect } from "react";
import PageHeader from "../../Components/PageHeader";
import { trackPageView } from "../../Common/Analytics";

const ResumePage = () => {
    useEffect(() => {
      const PAGE_TITLE = "Resume";
      document.title = PAGE_TITLE;
      trackPageView(PAGE_TITLE);
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
