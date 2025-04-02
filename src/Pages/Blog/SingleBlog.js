import "./Blog.css";
import ReactGA from "react-ga4";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";
import { getBlogData } from "../../Common/Api";
import { BLOG_DETAILS_GRAPHQL_QUERY } from "../../Common/GraphQL";
import PageHeader from "../../Components/PageHeader";
import "../../Common/Typography.css";
import sanitize from "sanitize-html";
import { RoundCard } from "../../Components/Common/Common";
import { formatTimestamp, isMobileDevice } from "../../Common/Utils";
import { trackPageView } from "../../Common/Analytics";

const SingleBlogPage = () => {
    const { slug } = useParams();
    const [loading, setLoading] = useState(false);
    const [blogData, setBlogData] = useState(null);

    useEffect(() => {
      const PAGE_TITLE = _.startCase(slug);
      document.title = PAGE_TITLE;
      trackPageView(PAGE_TITLE);
    }, [slug]);

    useEffect(() => {
        setLoading(true);
        !blogData && getBlogData(BLOG_DETAILS_GRAPHQL_QUERY, { slug })
          .then((data) => {
              setBlogData(data.posts[0]);
              setLoading(false);
          })
          .catch((error) => {
              console.error("Error fetching blog data:", error);
          });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    return (
        <PageHeader>
            { loading && 
                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status" />
                </div>
            }
            { blogData && 
                <div class="d-flex flex-direction mt-3 mb-5">
                  <RoundCard style={{ 'max-width': `${isMobileDevice() ? '90vw' : '50vw'}`, }}>
                    <img src={blogData.coverPhoto.url} class="card-img-top blog-card-img loading" alt="..." />
                    <div class="mt-5">
                        <h3 className="mb-4">
                            <strong>{blogData.title}</strong>
                        </h3>
                        <p dangerouslySetInnerHTML={{__html: sanitize(blogData.content.html)}} />
                        <p class="card-text">
                          <small class="text-muted">
                            Published: {formatTimestamp(blogData.publishDate)}
                          </small>
                        </p>
                    </div>
                  </RoundCard>
                </div>
            }
        </PageHeader>
    );
}

export default SingleBlogPage;