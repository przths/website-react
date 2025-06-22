import { useEffect } from "react";
import { trackPageView } from "../../Common/Analytics";
import SingleBlogPage from "../Blog/SingleBlog";

const ResumePage = ({ resumeData }) => {
  useEffect(() => {
    const PAGE_TITLE = "Resume";
    document.title = PAGE_TITLE;
    trackPageView(PAGE_TITLE);
  }, []);

  return (<SingleBlogPage customData={resumeData} customSlug="my-resume" />);
}

export default ResumePage;
