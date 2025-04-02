import { gql } from "graphql-request";

export const BLOG_SUMMARY_GRAPHQL_QUERY = gql`
    query {
        posts {
            title,
            summary,
            slug,
            coverPhoto {
                url
            },
            publishDate
        }
    }
`

export const BLOG_DETAILS_GRAPHQL_QUERY = gql`
    query SearchPostsBySlug($slug: String!) {
        posts(where: { slug: $slug }) {
            title
            coverPhoto {
                url
            },
            content {
                html
            },
            publishDate
        }
    }
`
export const PORTFOLIO_DATA_GRAPHQL_QUERY = gql`
  query {
    projects {
      projectImage {
        url
      }
      projectName
      projectDescription
      projectUrl
    }
  }
`
