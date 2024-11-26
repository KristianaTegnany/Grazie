import {gql} from "@apollo/client";

const query_stories = gql`
  query ($id: Int!) {
    user {
      id
    }
    stories(category: $id) {
      items {
        id
        media {
          type
          urlLq
        }
        title
        text
        template
        theme
        cta {
          url
          title
        }
      }
      total
    }
  }
`;

export default query_stories;
