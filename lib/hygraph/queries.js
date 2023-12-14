import { gql } from "graphql-request";

// const AllPosts = gql`
// // query AllPosts {
// //     blogPosts {
// //       body
// //       createdAt
// //       title
// //       id
// //       updatedAt
// //       heroImage {
// //         url
// //         width
// //       }
// //     }
// //   }`

  const AllPosts = gql`
  query AllPosts {
    blogPosts(orderBy: publishedAt_DESC) {
      body
      createdAt
      title
      id
      slug
      updatedAt
      heroImage {
        url
        width
        height
      }
    }
  }
`;

// const SinglePost = gql`
// query SinglePost($slug: String!) {
//   blogPost(where: { slug: $slug }) {
//     body
//     heroImage {
//       height
//       url
//       width
//     }
//     slug
//     title
//   }
// }`
  
const SinglePost = gql`
  query SinglePost($slug: String!) {
    blogPost(where: { slug: $slug }) {
      body
      createdAt
      title
      id
      slug
      updatedAt
      heroImage {
        url
        width
        height
      }
    }
  }
`;

  export { AllPosts, SinglePost };