import "./Blog.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBlogData } from "../../Common/Api";
import { BLOG_DETAILS_GRAPHQL_QUERY } from "../../Common/GraphQL";
import PageHeader from "../../Components/PageHeader";
import { BlogCard } from "../../Components/Common/Common";

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
            <div class='d-flex mx-auto justify-content-center mt-5'>
                { blogData && 
                    <BlogCard 
                        imageSrc={blogData.coverPhoto.url}
                        title={blogData.title}
                        body={blogData.content.html}
                        isBodyHTML
                        publishDate={blogData.publishDate}
                    />
                }
            </div>
        </PageHeader>
    );
}

export default SingleBlogPage;