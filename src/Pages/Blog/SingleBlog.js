import "./Blog.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";
import { Image } from "../../Components/Common/Common";
import { getBlogData } from "../../Common/Api";
import { BLOG_DETAILS_GRAPHQL_QUERY } from "../../Common/GraphQLQueries";
import sanitize from "sanitize-html";
import { RoundCard } from "../../Components/Common/Common";
import { formatTimestamp, getThemeColor, isMobileDevice } from "../../Common/Utils";
import { trackPageView } from "../../Common/Analytics";

const SingleBlogPage = ({ customData, customSlug }) => {
    let { slug } = useParams();
    customData && (slug = customSlug);
    const [loading, setLoading] = useState(false);
    const [blogData, setBlogData] = useState(null);

    useEffect(() => {
      if (!customSlug) {
        const PAGE_TITLE = _.startCase(slug);
        document.title = PAGE_TITLE;
        trackPageView(PAGE_TITLE);
      }
    }, [slug]);

    useEffect(() => {
        if (!customData && slug) {
          setLoading(true);
          getBlogData(BLOG_DETAILS_GRAPHQL_QUERY, { slug })
            .then((data) => {
                setBlogData(data.posts[0]);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching blog data:", error);
            });
        } else if (customData) {
          setLoading(false);
          setBlogData(customData.posts[0]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    return (
      <div>
        { loading && 
            <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status" />
            </div>
        }
        { blogData && 
            <div class="d-flex flex-direction mt-3 pb-4 mb-2">
              <RoundCard 
                style={{ 'maxWidth': `${isMobileDevice() ? '90vw' : '50vw'}`, }}
                className="mx-auto"
                backgroundColor={getThemeColor()}
              >
                <Image
                  src={blogData.coverPhoto.url} 
                  className="card-img-top blog-card-img loading" 
                  width={blogData.coverPhoto.width}
                  height={blogData.coverPhoto.height}
                />
                <div class="mt-4">
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
      </div>
    );
}

export default SingleBlogPage;