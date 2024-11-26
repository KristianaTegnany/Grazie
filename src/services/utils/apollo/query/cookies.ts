import {gql} from "@apollo/client";

const query_cookies = gql`
  query {
    config {
      cookies {
        title
        textHtml
      }
    }
  }
`;

export default query_cookies;
