import { useEffect } from "react";
import { trackPageView } from "../../Common/Analytics";
import SingleBlogPage from "../Blog/SingleBlog";

const ResumePage = () => {
  useEffect(() => {
    const PAGE_TITLE = "Resume";
    document.title = PAGE_TITLE;
    trackPageView(PAGE_TITLE);
  }, []);

  return (<SingleBlogPage customSlug="my-resume" />);
}

export default ResumePage;
