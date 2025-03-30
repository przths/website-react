import "./Blog.css";
import { useEffect, useState } from "react";
import PageHeader from "../../Components/PageHeader";
import { GraphQLClient, gql } from "graphql-request";
import { BlogCard } from "../../Components/Common/Common";

const hygraphCMS = new GraphQLClient(
    "https://ap-south-1.cdn.hygraph.com/content/cm8udyomx028b07uy1krahpun/master"
);

const GRAPHQL_QUERY = gql`
    query {
        posts {
            title,
            summary,
            coverPhoto {
                url
            },
            publishDate
        }
    }
`

export async function getBlogData(query) {
    const data = await hygraphCMS.request(query);
    return data;
}

const BlogPage = () => {
    const [loading, setLoading] = useState(false);
    const [blogData, setBlogData] = useState([]);

    useEffect(() => {
        setLoading(true);
        getBlogData(GRAPHQL_QUERY)
            .then((data) => {
                console.log('zzz data', data);
                setBlogData(data);
                setLoading(false);
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
                !loading && blogData?.posts?.length == 0 && 
                    <div class="d-flex justify-content-center">
                        No blogs to show right now! Once I add some I'll show them here!
                    </div>
            }
            <div class='d-flex flex-wrap mx-auto justify-content-between blog-container mt-5'>
                {
                    blogData?.posts?.length > 0 &&
                        blogData.posts.map((post) => {
                            return (
                                <BlogCard 
                                    imageSrc={post.coverPhoto.url}
                                    title={post.title}
                                    body={post.summary}
                                    publishDate={post.publishDate}
                                />
                            );
                        })
                }
            </div>
        </PageHeader>
    );
}

export default BlogPage;
