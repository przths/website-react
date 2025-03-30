import "./Blog.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBlogData } from "../../Common/Api";
import { BLOG_DETAILS_GRAPHQL_QUERY } from "../../Common/GraphQL";
import PageHeader from "../../Components/PageHeader";
import "../../Common/Typography.css";
import sanitize from "sanitize-html";

const SingleBlogPage = () => {
    const { slug } = useParams();
    const [loading, setLoading] = useState(false);
    const [blogData, setBlogData] = useState(null);

    useEffect(() => {
        setLoading(true);
        getBlogData(BLOG_DETAILS_GRAPHQL_QUERY, { slug })
            .then((data) => {
                setBlogData(data.posts[0]);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching blog data:", error);
            });
    }, [slug]);

    return (
        <PageHeader>
            { loading && 
                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status" />
                </div>
            }
            { blogData && 
                <div class='d-flex flex-row mx-auto blog-container m-5'>
                    <img src={blogData.coverPhoto.url} class="card-img-top single-blog-logo loading" alt="..." />
                    <div class="text-section ms-5">
                        <h3 className="mb-5">
                            <strong>{blogData.title}</strong>
                        </h3>
                        <p dangerouslySetInnerHTML={{__html: sanitize(blogData.content.html)}} />
                    </div>
                </div>
            }
        </PageHeader>
    );
}

export default SingleBlogPage;