import "./Blog.css";
import { useEffect, useState } from "react";
import PageHeader from "../../Components/PageHeader";
import { BlogCard } from "../../Components/Common/Common";
import { getBlogData } from "../../Common/Api";
import { BLOG_SUMMARY_GRAPHQL_QUERY } from "../../Common/GraphQL";
import { trackPageView } from "../../Common/Analytics";
import { useColorContext } from "../../Common/Context";

const BlogPage = () => {
    const [loading, setLoading] = useState(false);
    const [blogData, setBlogData] = useState(null);
    const backgroundColor = useColorContext();

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
        <PageHeader>
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
            <div class='d-flex flex-wrap mx-auto justify-content-between blog-container mt-3 mb-2'>
                {
                  blogData?.posts?.length > 0 &&
                    blogData.posts.map((post, index) => {
                      return (
                        <BlogCard 
                          key={index} 
                          postData={post} 
                          backgroundColor={backgroundColor}
                        />
                      );
                    })
                }
            </div>
        </PageHeader>
    );
}

export default BlogPage;
