import "./Blog.css";
import { useContext, useEffect, useState } from "react";
import { BlogCard } from "../../Components/Common/Common";
import { getBlogData } from "../../Common/Api";
import { BLOG_SUMMARY_GRAPHQL_QUERY } from "../../Common/GraphQL";
import { trackPageView } from "../../Common/Analytics";
import { ColorContext } from "../../Common/Context";

const BlogPage = () => {
  const darkMode = useContext(ColorContext);
  const [loading, setLoading] = useState(false);
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    const PAGE_TITLE = "Blog";
    document.title = PAGE_TITLE;
    trackPageView(PAGE_TITLE);
  }, []);

  useEffect(() => {
    setLoading(true);
    !blogData && getBlogData(BLOG_SUMMARY_GRAPHQL_QUERY)
      .then((data) => {
          setBlogData(data);
          setLoading(false);
      })
      .catch((error) => {
          console.error("Error fetching blog data:", error);
      });
  }, []);

  return (
    <div class='mt-4'>
      {
        blogData?.posts?.length > 0 &&
          <h5 class="text-center" style={{ 'color': darkMode ? 'white' : 'black' }}>My Blogs</h5>
      }
      <div class='d-flex flex-wrap mx-auto justify-content-between blog-container mt-3 pb-3'>
        { loading && 
            <div class="d-flex justify-content-center">
              <div class="spinner-border" role="status" />
            </div>
        }
        {
          !loading && blogData?.posts?.length === 0 && 
            <div class="d-flex justify-content-center">
                No blogs to show right now! Once I add some I'll show them here!
            </div>
        }
        {
          blogData?.posts?.length > 0 &&
            blogData.posts.map((post, index) => {
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
