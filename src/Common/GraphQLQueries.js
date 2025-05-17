import { gql } from "graphql-request";

export const BLOG_SUMMARY_GRAPHQL_QUERY = gql`
  query {
    posts(where: { slug_not_in: ["about-me", "my-resume"] }) {
      title
      summary
      slug
      coverPhoto {
        url
        width
        height
      }
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
              width
              height
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
        width
        height
      }
      projectName
      projectDescription
      projectUrl
    }
  }
`

export const ABOUT_ME_DATA_GRAPHQL_QUERY = gql`
  query AboutMeSearchQuery($slug: String!) {
    posts(where: { slug: $slug }) {
      title
      coverPhoto {
          url
          width
          height
      },
      content {
          html
      }
    }
    contacts {
      mediaImage {
        url
        width
        height
      }
      mediaLink
    }
  }
`
