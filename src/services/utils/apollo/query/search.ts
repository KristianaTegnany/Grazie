import {gql} from "@apollo/client";

const query_search = gql`
  query ($keywords: String!, $offset: Int) {
    user {
      id
    }
    search(keywords: $keywords, offset: $offset) {
      total
      items {
        id
        type
        title
        body
        thumbnail {
          label
          urlHq
          urlLq
        }
      }
    }
  }
`;

export default query_search;
