import "./Blog.css";
import { useContext, useEffect } from "react";
import { BlogCard } from "../../Components/Common/Common";
import { trackPageView } from "../../Common/Analytics";
import { ColorContext } from "../../Common/Context";

const BlogPage = ({ blogSummaryData }) => {
  const darkMode = useContext(ColorContext);

  useEffect(() => {
    const PAGE_TITLE = "Blog";
    document.title = PAGE_TITLE;
    trackPageView(PAGE_TITLE);
  }, []);

  return (
    <div class='mt-4'>
      {
        blogSummaryData?.posts?.length > 0 &&
          <h5 class="text-center" style={{ 'color': darkMode ? 'white' : 'black' }}>My Blogs</h5>
      }
      <div class='d-flex flex-wrap mx-auto justify-content-between blog-container mt-3 pb-3'>
        { !blogSummaryData && 
            <div class="d-flex justify-content-center">
              <div class="spinner-border" role="status" />
            </div>
        }
        {
          blogSummaryData?.posts?.length === 0 && 
            <div class="d-flex justify-content-center">
                No blogs to show right now! Once I add some I'll show them here!
            </div>
        }
        {
          blogSummaryData?.posts?.length > 0 &&
            blogSummaryData.posts.map((post, index) => {
              return (
                <BlogCard key={index} postData={post} />
              );
            })
        }
      </div>
    </div>
  );
}

export default BlogPage;
