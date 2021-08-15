import gql from "graphql-tag"

export const github_repo = gql`
  query($search: String!) {
    search(query: $search, type: REPOSITORY, first: 10) {
      edges {
        node {
          ... on Repository {
            id
            name
            stargazerCount
            forkCount
            url
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        startCursor
        hasPreviousPage
        endCursor
      }
    }
  }
`;