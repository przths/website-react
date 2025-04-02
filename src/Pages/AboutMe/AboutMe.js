import { useEffect } from "react";
import PageHeader from "../../Components/PageHeader";
import { trackPageView } from "../../Common/Analytics";

const AboutMePage = () => {
  useEffect(() => {
    const PAGE_TITLE = "About Me";
    document.title = PAGE_TITLE;
    trackPageView(PAGE_TITLE);
  }, []);

  return (
    <PageHeader>
      <h1>About Me</h1>
      <p>This is the about me page.</p>
    </PageHeader>
  );
}

export default AboutMePage;
